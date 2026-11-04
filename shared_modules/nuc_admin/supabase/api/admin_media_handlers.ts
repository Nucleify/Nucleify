import {
  apiBody,
  apiDeleted,
  apiError,
  decodeSeg,
  fromSupabaseError,
  readJsonBody,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import { requirePermission } from '../../utils/permissions'

const MEDIA_SELECT =
  'id, filename, mime, size, storage_path, alt, created_by, created_at'

export async function handleAdminMediaList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'media') {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'media.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { data, error } = await ctx.supabase
    .from('cms_media')
    .select(MEDIA_SELECT)
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminMediaCreate(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'POST' || ctx.segments.length !== 2 || ctx.segments[1] !== 'media') {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'media.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const body = await readJsonBody(ctx)
  const filename = String(body.filename ?? '').trim()
  const mime = String(body.mime ?? 'application/octet-stream').trim()
  const alt = String(body.alt ?? '').trim()
  const contentBase64 = String(body.contentBase64 ?? '').trim()
  let storagePath = String(body.storage_path ?? body.storagePath ?? '').trim()
  let size = Number(body.size ?? 0)

  if (!filename) return apiError(400, 'filename required')

  if (contentBase64) {
    const raw = contentBase64.includes(',')
      ? contentBase64.split(',').pop() || ''
      : contentBase64
    let bytes: Buffer
    try {
      bytes = Buffer.from(raw, 'base64')
    } catch {
      return apiError(400, 'invalid contentBase64')
    }
    size = bytes.byteLength
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    storagePath = `${Date.now()}_${safeName}`
    const { error: uploadError } = await ctx.supabase.storage
      .from('cms-media')
      .upload(storagePath, bytes, { contentType: mime, upsert: false })
    if (uploadError) {
      return apiError(400, uploadError.message || 'Upload failed')
    }
  }

  if (!storagePath) return apiError(400, 'storage_path or contentBase64 required')

  const { data, error } = await ctx.supabase
    .from('cms_media')
    .insert({
      filename,
      mime,
      size: Number.isFinite(size) ? size : 0,
      storage_path: storagePath,
      alt,
      created_by: userId,
    })
    .select(MEDIA_SELECT)
    .single()
  if (error) return fromSupabaseError(error)
  return apiBody({ data }, 201)
}

export async function handleAdminMediaPatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    !['PATCH', 'PUT'].includes(ctx.method) ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'media'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'media.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const id = decodeSeg(ctx.segments[2] || '')
  if (!id) return apiError(400, 'id required')
  const body = await readJsonBody(ctx)
  const patch: Record<string, unknown> = {}
  if (body.alt !== undefined) patch.alt = String(body.alt ?? '')
  if (body.filename !== undefined) patch.filename = String(body.filename ?? '').trim()

  const { data, error } = await ctx.supabase
    .from('cms_media')
    .update(patch)
    .eq('id', id)
    .select(MEDIA_SELECT)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Media not found')
  return apiBody({ data })
}

export async function handleAdminMediaDelete(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'DELETE' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'media'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'media.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const id = decodeSeg(ctx.segments[2] || '')
  if (!id) return apiError(400, 'id required')

  const { data: existing } = await ctx.supabase
    .from('cms_media')
    .select('storage_path')
    .eq('id', id)
    .maybeSingle()

  const { error } = await ctx.supabase.from('cms_media').delete().eq('id', id)
  if (error) return fromSupabaseError(error)

  if (existing?.storage_path) {
    await ctx.supabase.storage.from('cms-media').remove([existing.storage_path])
  }
  return apiDeleted()
}
