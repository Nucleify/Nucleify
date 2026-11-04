import {
  apiBody,
  apiError,
  decodeSeg,
  fromSupabaseError,
  readJsonBody,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'
import { getQuery } from 'h3'

import { getAdminConfig, getGlobalConfig } from '../../cms/admin_config'
import { requirePermission } from '../../utils/permissions'

const GLOBAL_SELECT =
  'id, global_slug, locale, status, data, created_at, updated_at'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export async function handleAdminGlobalsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'globals') {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)
  return apiBody({
    data: getAdminConfig().globals.map((g) => ({
      slug: g.slug,
      label: g.label,
    })),
  })
}

export async function handleAdminGlobalGet(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'globals'
  ) {
    return null
  }

  const slug = decodeSeg(ctx.segments[2] || '')
  if (!getGlobalConfig(slug)) return apiError(404, 'Unknown global')

  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const query = getQuery(ctx.event)
  const locale = String(query.locale ?? 'en').trim() || 'en'

  const { data, error } = await ctx.supabase
    .from('cms_global_documents')
    .select(GLOBAL_SELECT)
    .eq('global_slug', slug)
    .eq('locale', locale)
    .maybeSingle()
  if (error) return fromSupabaseError(error)

  if (!data) {
    return apiBody({
      data: {
        id: null,
        global_slug: slug,
        locale,
        status: 'draft',
        data: {},
      },
    })
  }
  return apiBody({ data })
}

export async function handleAdminGlobalPatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    !['PATCH', 'PUT', 'POST'].includes(ctx.method) ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'globals'
  ) {
    return null
  }

  const slug = decodeSeg(ctx.segments[2] || '')
  if (!getGlobalConfig(slug)) return apiError(404, 'Unknown global')

  const writeGate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!writeGate.ok) {
    if (slug === 'settings') {
      const settingsGate = await requirePermission(
        ctx.supabase,
        userId,
        'settings.write'
      )
      if (!settingsGate.ok) {
        return apiError(writeGate.status, writeGate.error)
      }
    } else {
      return apiError(writeGate.status, writeGate.error)
    }
  }

  const query = getQuery(ctx.event)
  const body = await readJsonBody(ctx)
  const locale =
    String(body.locale ?? query.locale ?? 'en').trim() || 'en'
  const status = String(body.status ?? 'draft')
  if (status !== 'draft' && status !== 'published') {
    return apiError(400, 'status must be draft or published')
  }
  const data = isPlainObject(body.data) ? body.data : {}
  const now = new Date().toISOString()

  const { data: existing, error: findError } = await ctx.supabase
    .from('cms_global_documents')
    .select('id')
    .eq('global_slug', slug)
    .eq('locale', locale)
    .maybeSingle()
  if (findError) return fromSupabaseError(findError)

  if (existing?.id) {
    const { data: row, error } = await ctx.supabase
      .from('cms_global_documents')
      .update({ status, data, updated_at: now })
      .eq('id', existing.id)
      .select(GLOBAL_SELECT)
      .single()
    if (error) return fromSupabaseError(error)
    return apiBody({ data: row })
  }

  const { data: row, error } = await ctx.supabase
    .from('cms_global_documents')
    .insert({
      global_slug: slug,
      locale,
      status,
      data,
      updated_at: now,
    })
    .select(GLOBAL_SELECT)
    .single()
  if (error) return fromSupabaseError(error)
  return apiBody({ data: row }, 201)
}
