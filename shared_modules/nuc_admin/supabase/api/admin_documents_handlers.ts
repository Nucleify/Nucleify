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

import { getAdminConfig, getCollectionConfig } from '../../cms/admin_config'
import { validateDocumentData } from '../../cms/validate_layout'
import { requirePermission } from '../../utils/permissions'

const DOC_SELECT =
  'id, collection_slug, locale, title, slug, status, published_at, data, created_at, updated_at'

function normalizeSlug(raw: unknown): string {
  return String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function buildDataPayload(body: Record<string, unknown>): Record<string, unknown> {
  if (isPlainObject(body.data)) return { ...body.data }
  const data: Record<string, unknown> = {}
  if (Array.isArray(body.sections)) {
    data.version = Number(body.version ?? 1)
    data.sections = body.sections
  }
  if (isPlainObject(body.seo)) data.seo = body.seo
  if (isPlainObject(body.layout)) Object.assign(data, body.layout)
  return data
}

export async function handleAdminConfigGet(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'config') {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)
  return apiBody({ data: getAdminConfig() })
}

export async function handleAdminCollectionsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'collections'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)
  return apiBody({
    data: getAdminConfig().collections.map((c) => ({
      slug: c.slug,
      labels: c.labels,
    })),
  })
}

export async function handleAdminDocumentsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'collections'
  ) {
    return null
  }

  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  if (!getCollectionConfig(collectionSlug)) {
    return apiError(404, 'Unknown collection')
  }

  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const query = getQuery(ctx.event)
  const locale = String(query.locale ?? '').trim()

  let q = ctx.supabase
    .from('cms_documents')
    .select(
      'id, collection_slug, locale, title, slug, status, published_at, updated_at, created_at'
    )
    .eq('collection_slug', collectionSlug)
    .order('updated_at', { ascending: false })
    .limit(200)

  if (locale) q = q.eq('locale', locale)

  const { data, error } = await q
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminDocumentsCreate(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'POST' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'collections'
  ) {
    return null
  }

  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  if (!getCollectionConfig(collectionSlug)) {
    return apiError(404, 'Unknown collection')
  }

  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const body = await readJsonBody(ctx)
  const slug = normalizeSlug(body.slug)
  const locale = String(body.locale ?? 'en').trim() || 'en'
  const title = String(body.title ?? '').trim()
  const status = String(body.status ?? 'draft')
  const data = buildDataPayload(body)

  if (!slug) return apiError(400, 'slug required')
  if (status !== 'draft' && status !== 'published') {
    return apiError(400, 'status must be draft or published')
  }

  const layoutCheck = validateDocumentData(data)
  if (!layoutCheck.ok) return apiError(400, layoutCheck.error)
  if (Array.isArray(data.sections) || isPlainObject(data.layout)) {
    data.version = layoutCheck.layout.version
    data.sections = layoutCheck.layout.sections
    if (layoutCheck.layout.seo) data.seo = layoutCheck.layout.seo
  }

  const now = new Date().toISOString()
  const { data: row, error } = await ctx.supabase
    .from('cms_documents')
    .insert({
      collection_slug: collectionSlug,
      slug,
      locale,
      title,
      status,
      data,
      published_at: status === 'published' ? now : null,
      updated_at: now,
    })
    .select(DOC_SELECT)
    .single()
  if (error) return fromSupabaseError(error)
  return apiBody({ data: row }, 201)
}

export async function handleAdminDocumentGet(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 4 ||
    ctx.segments[1] !== 'collections'
  ) {
    return null
  }

  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const id = decodeSeg(ctx.segments[3] || '')
  if (!getCollectionConfig(collectionSlug)) {
    return apiError(404, 'Unknown collection')
  }
  if (!id || id === 'publish' || id === 'unpublish') return null

  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { data, error } = await ctx.supabase
    .from('cms_documents')
    .select(DOC_SELECT)
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Document not found')
  return apiBody({ data })
}

export async function handleAdminDocumentPatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    !['PATCH', 'PUT'].includes(ctx.method) ||
    ctx.segments.length !== 4 ||
    ctx.segments[1] !== 'collections'
  ) {
    return null
  }

  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const id = decodeSeg(ctx.segments[3] || '')
  if (!getCollectionConfig(collectionSlug)) {
    return apiError(404, 'Unknown collection')
  }
  if (!id || id === 'publish' || id === 'unpublish') return null

  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const body = await readJsonBody(ctx)
  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (body.title !== undefined) patch.title = String(body.title ?? '').trim()
  if (body.slug !== undefined) {
    const slug = normalizeSlug(body.slug)
    if (!slug) return apiError(400, 'slug required')
    patch.slug = slug
  }
  if (body.locale !== undefined) {
    patch.locale = String(body.locale ?? 'en').trim() || 'en'
  }
  if (body.status !== undefined) {
    const status = String(body.status)
    if (status !== 'draft' && status !== 'published') {
      return apiError(400, 'status must be draft or published')
    }
    patch.status = status
    if (status === 'published') {
      patch.published_at = new Date().toISOString()
    }
  }
  if (
    body.data !== undefined ||
    body.sections !== undefined ||
    body.layout !== undefined ||
    body.seo !== undefined
  ) {
    const data = buildDataPayload(body)
    const layoutCheck = validateDocumentData(data)
    if (!layoutCheck.ok) return apiError(400, layoutCheck.error)
    if (Array.isArray(data.sections) || isPlainObject(data.layout)) {
      data.version = layoutCheck.layout.version
      data.sections = layoutCheck.layout.sections
      if (layoutCheck.layout.seo) data.seo = layoutCheck.layout.seo
    }
    patch.data = data
  }

  const { data, error } = await ctx.supabase
    .from('cms_documents')
    .update(patch)
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
    .select(DOC_SELECT)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Document not found')
  return apiBody({ data })
}

export async function handleAdminDocumentDelete(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'DELETE' ||
    ctx.segments.length !== 4 ||
    ctx.segments[1] !== 'collections'
  ) {
    return null
  }

  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const id = decodeSeg(ctx.segments[3] || '')
  if (!getCollectionConfig(collectionSlug)) {
    return apiError(404, 'Unknown collection')
  }
  if (!id) return apiError(400, 'id required')

  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { error } = await ctx.supabase
    .from('cms_documents')
    .delete()
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
  if (error) return fromSupabaseError(error)
  return apiDeleted()
}

export async function handleAdminDocumentPublish(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'POST' ||
    ctx.segments.length !== 5 ||
    ctx.segments[1] !== 'collections'
  ) {
    return null
  }

  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const id = decodeSeg(ctx.segments[3] || '')
  const action = decodeSeg(ctx.segments[4] || '')
  if (action !== 'publish' && action !== 'unpublish') return null
  if (!getCollectionConfig(collectionSlug)) {
    return apiError(404, 'Unknown collection')
  }

  const publishGate = await requirePermission(ctx.supabase, userId, 'cms.publish')
  if (!publishGate.ok) {
    const writeGate = await requirePermission(ctx.supabase, userId, 'cms.write')
    if (!writeGate.ok) return apiError(publishGate.status, publishGate.error)
  }

  const now = new Date().toISOString()
  const patch =
    action === 'publish'
      ? { status: 'published', published_at: now, updated_at: now }
      : { status: 'draft', updated_at: now }

  const { data, error } = await ctx.supabase
    .from('cms_documents')
    .update(patch)
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
    .select(DOC_SELECT)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Document not found')
  return apiBody({ data })
}
