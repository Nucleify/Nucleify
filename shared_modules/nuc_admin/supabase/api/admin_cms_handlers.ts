import {
  apiBody,
  apiDeleted,
  apiError,
  decodeSeg,
  fromSupabaseError,
  readJsonBody,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'
import { getQuery } from 'h3'

import { requirePermission } from '../../utils/permissions'

export async function handleAdminCmsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'cms') {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const query = getQuery(ctx.event)
  const locale = String(query.locale ?? '').trim()

  let q = ctx.supabase
    .from('cms_entries')
    .select('id, slug, locale, title, status, updated_at, created_at')
    .order('updated_at', { ascending: false })
    .limit(200)

  if (locale) q = q.eq('locale', locale)

  const { data, error } = await q
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminCmsGet(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 3 || ctx.segments[1] !== 'cms') {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const slug = decodeSeg(ctx.segments[2] || '')
  if (!slug) return apiError(400, 'slug required')

  const query = getQuery(ctx.event)
  const locale = String(query.locale ?? 'en').trim() || 'en'

  const { data, error } = await ctx.supabase
    .from('cms_entries')
    .select('id, slug, locale, title, body, status, updated_at, created_at')
    .eq('slug', slug)
    .eq('locale', locale)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Entry not found')
  return apiBody({ data })
}

export async function handleAdminCmsCreate(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'POST' || ctx.segments.length !== 2 || ctx.segments[1] !== 'cms') {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const body = await readJsonBody(ctx)
  const slug = String(body.slug ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
  const locale = String(body.locale ?? 'en').trim() || 'en'
  const title = String(body.title ?? '').trim()
  const markdown = String(body.body ?? '')
  const status = String(body.status ?? 'draft')

  if (!slug) return apiError(400, 'slug required')
  if (status !== 'draft' && status !== 'published') {
    return apiError(400, 'status must be draft or published')
  }

  const now = new Date().toISOString()
  const { data, error } = await ctx.supabase
    .from('cms_entries')
    .insert({
      slug,
      locale,
      title,
      body: markdown,
      status,
      updated_at: now,
    })
    .select('id, slug, locale, title, body, status, updated_at, created_at')
    .single()
  if (error) return fromSupabaseError(error)
  return apiBody({ data }, 201)
}

export async function handleAdminCmsPatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    !['PATCH', 'PUT'].includes(ctx.method) ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'cms'
  ) {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const slug = decodeSeg(ctx.segments[2] || '')
  if (!slug) return apiError(400, 'slug required')

  const query = getQuery(ctx.event)
  const locale = String(query.locale ?? 'en').trim() || 'en'
  const body = await readJsonBody(ctx)

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (body.title !== undefined) patch.title = String(body.title ?? '').trim()
  if (body.body !== undefined) patch.body = String(body.body ?? '')
  if (body.status !== undefined) {
    const status = String(body.status)
    if (status !== 'draft' && status !== 'published') {
      return apiError(400, 'status must be draft or published')
    }
    patch.status = status
  }

  const { data, error } = await ctx.supabase
    .from('cms_entries')
    .update(patch)
    .eq('slug', slug)
    .eq('locale', locale)
    .select('id, slug, locale, title, body, status, updated_at, created_at')
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Entry not found')
  return apiBody({ data })
}

export async function handleAdminCmsDelete(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'DELETE' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'cms'
  ) {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const slug = decodeSeg(ctx.segments[2] || '')
  if (!slug) return apiError(400, 'slug required')

  const query = getQuery(ctx.event)
  const locale = String(query.locale ?? 'en').trim() || 'en'

  const { error } = await ctx.supabase
    .from('cms_entries')
    .delete()
    .eq('slug', slug)
    .eq('locale', locale)
  if (error) return fromSupabaseError(error)
  return apiDeleted()
}
