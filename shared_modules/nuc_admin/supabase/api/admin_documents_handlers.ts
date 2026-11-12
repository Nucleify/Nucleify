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

import { buildSearchText, recordCmsActivity } from '../../cms/activity'
import { getAdminConfig, getCollectionConfig } from '../../cms/admin_config'
import { validateDocumentData } from '../../cms/validate_layout'
import { requirePermission } from '../../utils/permissions'

const DOC_SELECT =
  'id, collection_slug, locale, title, slug, status, published_at, data, created_at, updated_at, template, translation_group, deleted_at'

const ALLOWED_STATUSES = new Set(['draft', 'published', 'scheduled', 'trash'])

function resolveStatusAndPublishAt(
  status: string,
  publishedAtRaw: unknown
): { status: string; published_at: string | null; deleted_at: string | null } {
  const now = new Date().toISOString()
  if (status === 'trash') {
    return { status, published_at: null, deleted_at: now }
  }
  if (status === 'scheduled') {
    const at =
      typeof publishedAtRaw === 'string' && publishedAtRaw.trim()
        ? new Date(publishedAtRaw).toISOString()
        : now
    if (new Date(at).getTime() <= Date.now()) {
      return { status: 'published', published_at: at, deleted_at: null }
    }
    return { status: 'scheduled', published_at: at, deleted_at: null }
  }
  if (status === 'published') {
    const at =
      typeof publishedAtRaw === 'string' && publishedAtRaw.trim()
        ? new Date(publishedAtRaw).toISOString()
        : now
    return { status: 'published', published_at: at, deleted_at: null }
  }
  return { status: 'draft', published_at: null, deleted_at: null }
}

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
  if (Array.isArray(body.body)) data.body = body.body
  if (body.excerpt !== undefined) data.excerpt = body.excerpt
  if (body.featuredImage !== undefined) data.featuredImage = body.featuredImage
  if (body.enableIris !== undefined) data.enableIris = body.enableIris
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

  const statusFilter = String(query.status ?? '').trim()
  const includeTrash = String(query.trash ?? '') === '1'

  let q = ctx.supabase
    .from('cms_documents')
    .select(
      'id, collection_slug, locale, title, slug, status, published_at, updated_at, created_at, template, deleted_at'
    )
    .eq('collection_slug', collectionSlug)
    .order('updated_at', { ascending: false })
    .limit(200)

  if (locale) q = q.eq('locale', locale)
  if (statusFilter) q = q.eq('status', statusFilter)
  else if (!includeTrash) q = q.neq('status', 'trash')

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
  const statusRaw = String(body.status ?? 'draft')
  if (!ALLOWED_STATUSES.has(statusRaw)) {
    return apiError(400, 'invalid status')
  }
  const data = buildDataPayload(body)
  const template = String(body.template ?? data.template ?? 'default').trim() || 'default'

  if (!slug) return apiError(400, 'slug required')

  if (collectionSlug === 'pages') {
    const layoutCheck = validateDocumentData(data)
    if (!layoutCheck.ok) return apiError(400, layoutCheck.error)
    if (Array.isArray(data.sections) || isPlainObject(data.layout)) {
      data.version = layoutCheck.layout.version
      data.sections = layoutCheck.layout.sections
      if (layoutCheck.layout.seo) data.seo = layoutCheck.layout.seo
    }
  }

  const resolved = resolveStatusAndPublishAt(
    statusRaw,
    body.publishedAt ?? body.published_at
  )
  const now = new Date().toISOString()
  const search_text = buildSearchText([title, slug, data])
  const translationGroup =
    body.translationGroup ?? body.translation_group ?? null
  const { data: row, error } = await ctx.supabase
    .from('cms_documents')
    .insert({
      collection_slug: collectionSlug,
      slug,
      locale,
      title,
      status: resolved.status,
      data,
      template,
      published_at: resolved.published_at,
      deleted_at: resolved.deleted_at,
      search_text,
      translation_group: translationGroup || null,
      updated_at: now,
    })
    .select(DOC_SELECT)
    .single()
  if (error) return fromSupabaseError(error)
  await recordCmsActivity(ctx.supabase, {
    actorId: userId,
    action: 'document.create',
    entityId: row.id,
    meta: { collection: collectionSlug, slug },
  })
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
  if (body.template !== undefined) {
    patch.template = String(body.template ?? 'default').trim() || 'default'
  }
  if (body.translation_group !== undefined || body.translationGroup !== undefined) {
    patch.translation_group =
      body.translation_group ?? body.translationGroup ?? null
  }
  if (body.status !== undefined) {
    const status = String(body.status)
    if (!ALLOWED_STATUSES.has(status)) {
      return apiError(400, 'invalid status')
    }
    const resolved = resolveStatusAndPublishAt(
      status,
      body.publishedAt ?? body.published_at
    )
    patch.status = resolved.status
    patch.published_at = resolved.published_at
    patch.deleted_at = resolved.deleted_at
  } else if (body.publishedAt !== undefined || body.published_at !== undefined) {
    const at = body.publishedAt ?? body.published_at
    patch.published_at =
      typeof at === 'string' && at.trim() ? new Date(at).toISOString() : null
  }
  if (
    body.data !== undefined ||
    body.sections !== undefined ||
    body.body !== undefined ||
    body.layout !== undefined ||
    body.seo !== undefined ||
    body.excerpt !== undefined ||
    body.featuredImage !== undefined ||
    body.enableIris !== undefined
  ) {
    const data = buildDataPayload(body)
    if (body.excerpt !== undefined) data.excerpt = body.excerpt
    if (body.featuredImage !== undefined) data.featuredImage = body.featuredImage
    if (body.body !== undefined) data.body = body.body
    if (body.enableIris !== undefined) data.enableIris = body.enableIris
    if (collectionSlug === 'pages') {
      const layoutCheck = validateDocumentData(data)
      if (!layoutCheck.ok) return apiError(400, layoutCheck.error)
      if (Array.isArray(data.sections) || isPlainObject(data.layout)) {
        data.version = layoutCheck.layout.version
        data.sections = layoutCheck.layout.sections
        if (layoutCheck.layout.seo) data.seo = layoutCheck.layout.seo
      }
    }
    patch.data = data
    patch.search_text = buildSearchText([
      patch.title,
      patch.slug,
      data,
    ])
  }

  // Optimistic concurrency: reject stale saves when updated_at mismatches.
  if (typeof body.expectedUpdatedAt === 'string' && body.expectedUpdatedAt) {
    const { data: current } = await ctx.supabase
      .from('cms_documents')
      .select('updated_at')
      .eq('id', id)
      .maybeSingle()
    if (
      current?.updated_at &&
      current.updated_at !== body.expectedUpdatedAt
    ) {
      return apiError(409, 'Document was modified by someone else')
    }
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
  await recordCmsActivity(ctx.supabase, {
    actorId: userId,
    action: 'document.update',
    entityId: id,
    meta: { collection: collectionSlug },
  })
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

  const soft = String(getQuery(ctx.event).hard ?? '') !== '1'
  if (soft) {
    const now = new Date().toISOString()
    const { error } = await ctx.supabase
      .from('cms_documents')
      .update({ status: 'trash', deleted_at: now, updated_at: now })
      .eq('collection_slug', collectionSlug)
      .eq('id', id)
    if (error) return fromSupabaseError(error)
    await recordCmsActivity(ctx.supabase, {
      actorId: userId,
      action: 'document.trash',
      entityId: id,
      meta: { collection: collectionSlug },
    })
    return apiDeleted()
  }

  const { error } = await ctx.supabase
    .from('cms_documents')
    .delete()
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
  if (error) return fromSupabaseError(error)
  await recordCmsActivity(ctx.supabase, {
    actorId: userId,
    action: 'document.delete',
    entityId: id,
    meta: { collection: collectionSlug },
  })
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

  const { data: existing } = await ctx.supabase
    .from('cms_documents')
    .select(DOC_SELECT)
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
    .maybeSingle()
  if (!existing) return apiError(404, 'Document not found')

  const now = new Date().toISOString()
  if (action === 'publish') {
    await ctx.supabase.from('cms_document_revisions').insert({
      document_id: id,
      data: existing.data ?? {},
      title: existing.title,
      slug: existing.slug,
      status: existing.status,
      note: 'Auto revision before publish',
      created_by: userId,
    })
  }

  const patch =
    action === 'publish'
      ? {
          status: 'published',
          published_at: now,
          updated_at: now,
          deleted_at: null,
        }
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
  await recordCmsActivity(ctx.supabase, {
    actorId: userId,
    action: action === 'publish' ? 'document.publish' : 'document.unpublish',
    entityId: id,
    meta: { collection: collectionSlug },
  })
  return apiBody({ data })
}
