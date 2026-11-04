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

const REDIRECT_SELECT =
  'id, from_path, to_path, status_code, enabled, created_at, updated_at'

function normalizePath(raw: unknown): string {
  const value = String(raw ?? '').trim()
  if (!value) return ''
  return value.startsWith('/') ? value : `/${value}`
}

export async function handleAdminRedirectsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'redirects'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { data, error } = await ctx.supabase
    .from('cms_redirects')
    .select(REDIRECT_SELECT)
    .order('from_path', { ascending: true })
    .limit(500)
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminRedirectCreate(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'POST' ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'redirects'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const body = await readJsonBody(ctx)
  const from_path = normalizePath(body.from_path ?? body.fromPath)
  const to_path = normalizePath(body.to_path ?? body.toPath)
  const status_code = Number(body.status_code ?? body.statusCode ?? 301)
  const enabled = body.enabled !== false

  if (!from_path || !to_path) return apiError(400, 'from_path and to_path required')
  if (![301, 302, 307, 308].includes(status_code)) {
    return apiError(400, 'invalid status_code')
  }

  const now = new Date().toISOString()
  const { data, error } = await ctx.supabase
    .from('cms_redirects')
    .insert({ from_path, to_path, status_code, enabled, updated_at: now })
    .select(REDIRECT_SELECT)
    .single()
  if (error) return fromSupabaseError(error)
  return apiBody({ data }, 201)
}

export async function handleAdminRedirectPatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    !['PATCH', 'PUT'].includes(ctx.method) ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'redirects'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const id = decodeSeg(ctx.segments[2] || '')
  if (!id) return apiError(400, 'id required')
  const body = await readJsonBody(ctx)
  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (body.from_path !== undefined || body.fromPath !== undefined) {
    const from_path = normalizePath(body.from_path ?? body.fromPath)
    if (!from_path) return apiError(400, 'from_path required')
    patch.from_path = from_path
  }
  if (body.to_path !== undefined || body.toPath !== undefined) {
    const to_path = normalizePath(body.to_path ?? body.toPath)
    if (!to_path) return apiError(400, 'to_path required')
    patch.to_path = to_path
  }
  if (body.status_code !== undefined || body.statusCode !== undefined) {
    const status_code = Number(body.status_code ?? body.statusCode)
    if (![301, 302, 307, 308].includes(status_code)) {
      return apiError(400, 'invalid status_code')
    }
    patch.status_code = status_code
  }
  if (body.enabled !== undefined) patch.enabled = Boolean(body.enabled)

  const { data, error } = await ctx.supabase
    .from('cms_redirects')
    .update(patch)
    .eq('id', id)
    .select(REDIRECT_SELECT)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Redirect not found')
  return apiBody({ data })
}

export async function handleAdminRedirectDelete(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'DELETE' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'redirects'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const id = decodeSeg(ctx.segments[2] || '')
  if (!id) return apiError(400, 'id required')
  const { error } = await ctx.supabase.from('cms_redirects').delete().eq('id', id)
  if (error) return fromSupabaseError(error)
  return apiDeleted()
}
