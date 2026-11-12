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

import { recordCmsActivity } from '../../cms/activity'
import { signPreviewToken } from '../../cms/preview_token'
import { requirePermission } from '../../utils/permissions'

const DOC_SELECT =
  'id, collection_slug, locale, title, slug, status, published_at, data, created_at, updated_at, template, translation_group, deleted_at'

export async function handleAdminPreviewToken(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'POST' ||
    ctx.segments.length !== 5 ||
    ctx.segments[1] !== 'collections' ||
    ctx.segments[4] !== 'preview-token'
  ) {
    return null
  }
  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const id = decodeSeg(ctx.segments[3] || '')
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { data, error } = await ctx.supabase
    .from('cms_documents')
    .select('id, slug, locale, collection_slug')
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Document not found')

  const token = signPreviewToken({
    slug: data.slug,
    locale: data.locale,
    collection: data.collection_slug,
  })
  return apiBody({
    data: {
      token,
      path: `/${data.locale}/preview/${data.slug}?token=${encodeURIComponent(token)}`,
    },
  })
}

export async function handleAdminRevisionsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 5 ||
    ctx.segments[1] !== 'collections' ||
    ctx.segments[4] !== 'revisions'
  ) {
    return null
  }
  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const id = decodeSeg(ctx.segments[3] || '')
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { data: doc } = await ctx.supabase
    .from('cms_documents')
    .select('id')
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
    .maybeSingle()
  if (!doc) return apiError(404, 'Document not found')

  const { data, error } = await ctx.supabase
    .from('cms_document_revisions')
    .select('id, title, slug, status, note, created_by, created_at')
    .eq('document_id', id)
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminRevisionCreate(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'POST' ||
    ctx.segments.length !== 5 ||
    ctx.segments[1] !== 'collections' ||
    ctx.segments[4] !== 'revisions'
  ) {
    return null
  }
  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const id = decodeSeg(ctx.segments[3] || '')
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const body = await readJsonBody(ctx)
  const note = String(body.note ?? 'Manual revision').trim()

  const { data: doc, error: docError } = await ctx.supabase
    .from('cms_documents')
    .select(DOC_SELECT)
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
    .maybeSingle()
  if (docError) return fromSupabaseError(docError)
  if (!doc) return apiError(404, 'Document not found')

  const { data, error } = await ctx.supabase
    .from('cms_document_revisions')
    .insert({
      document_id: id,
      data: doc.data ?? {},
      title: doc.title,
      slug: doc.slug,
      status: doc.status,
      note,
      created_by: userId,
    })
    .select('id, created_at, note')
    .single()
  if (error) return fromSupabaseError(error)
  await recordCmsActivity(ctx.supabase, {
    actorId: userId,
    action: 'revision.create',
    entityId: id,
    meta: { revisionId: data.id },
  })
  return apiBody({ data }, 201)
}

export async function handleAdminRevisionRestore(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  // POST /api/admin/collections/:col/:id/revisions/:revisionId/restore
  if (
    ctx.method !== 'POST' ||
    ctx.segments.length !== 7 ||
    ctx.segments[1] !== 'collections' ||
    ctx.segments[4] !== 'revisions' ||
    ctx.segments[6] !== 'restore'
  ) {
    return null
  }

  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const id = decodeSeg(ctx.segments[3] || '')
  const revisionId = decodeSeg(ctx.segments[5] || '')
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { data: revision, error: revError } = await ctx.supabase
    .from('cms_document_revisions')
    .select('*')
    .eq('id', revisionId)
    .eq('document_id', id)
    .maybeSingle()
  if (revError) return fromSupabaseError(revError)
  if (!revision) return apiError(404, 'Revision not found')

  const now = new Date().toISOString()
  const { data, error } = await ctx.supabase
    .from('cms_documents')
    .update({
      title: revision.title,
      slug: revision.slug,
      data: revision.data,
      updated_at: now,
    })
    .eq('collection_slug', collectionSlug)
    .eq('id', id)
    .select(DOC_SELECT)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Document not found')
  await recordCmsActivity(ctx.supabase, {
    actorId: userId,
    action: 'revision.restore',
    entityId: id,
    meta: { revisionId },
  })
  return apiBody({ data })
}

export async function handleAdminSchedulePromote(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'POST' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'cms' ||
    ctx.segments[2] !== 'promote-scheduled'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.publish')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const now = new Date().toISOString()
  const { data, error } = await ctx.supabase
    .from('cms_documents')
    .update({ status: 'published', updated_at: now })
    .eq('status', 'scheduled')
    .lte('published_at', now)
    .select('id, slug, collection_slug')
  if (error) return fromSupabaseError(error)
  for (const row of data ?? []) {
    await recordCmsActivity(ctx.supabase, {
      actorId: userId,
      action: 'schedule.promote',
      entityId: row.id,
      meta: { slug: row.slug, collection: row.collection_slug },
    })
  }
  return apiBody({ data: { promoted: data?.length ?? 0, items: data ?? [] } })
}

export async function handleAdminDashboard(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'dashboard'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const [{ data: drafts }, { data: scheduled }, { data: activity }, { data: contact }] =
    await Promise.all([
      ctx.supabase
        .from('cms_documents')
        .select('id, title, slug, collection_slug, locale, status, updated_at')
        .eq('status', 'draft')
        .order('updated_at', { ascending: false })
        .limit(10),
      ctx.supabase
        .from('cms_documents')
        .select('id, title, slug, collection_slug, locale, published_at')
        .eq('status', 'scheduled')
        .order('published_at', { ascending: true })
        .limit(10),
      ctx.supabase
        .from('cms_activity')
        .select('id, action, entity_type, entity_id, meta, created_at')
        .order('created_at', { ascending: false })
        .limit(15),
      ctx.supabase
        .from('cms_contact_submissions')
        .select('id, name, email, type, status, created_at')
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(5),
    ])

  return apiBody({
    data: {
      drafts: drafts ?? [],
      scheduled: scheduled ?? [],
      activity: activity ?? [],
      contactNew: contact ?? [],
    },
  })
}

export async function handleAdminDocumentsSearch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'search'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const q = String(getQuery(ctx.event).q ?? '').trim()
  if (!q) return apiBody({ data: [] })

  const { data, error } = await ctx.supabase
    .from('cms_documents')
    .select(
      'id, collection_slug, locale, title, slug, status, updated_at'
    )
    .or(`title.ilike.%${q}%,slug.ilike.%${q}%,search_text.ilike.%${q}%`)
    .neq('status', 'trash')
    .order('updated_at', { ascending: false })
    .limit(30)
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminDocumentsBulk(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'POST' ||
    ctx.segments.length !== 4 ||
    ctx.segments[1] !== 'collections' ||
    ctx.segments[3] !== 'bulk'
  ) {
    return null
  }
  const collectionSlug = decodeSeg(ctx.segments[2] || '')
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const body = await readJsonBody(ctx)
  const ids = Array.isArray(body.ids)
    ? body.ids.map((id) => String(id)).filter(Boolean)
    : []
  const action = String(body.action ?? '').trim()
  if (!ids.length) return apiError(400, 'ids required')
  if (!['publish', 'trash', 'draft', 'delete'].includes(action)) {
    return apiError(400, 'unsupported bulk action')
  }

  const now = new Date().toISOString()
  if (action === 'delete') {
    const { error } = await ctx.supabase
      .from('cms_documents')
      .delete()
      .eq('collection_slug', collectionSlug)
      .in('id', ids)
    if (error) return fromSupabaseError(error)
  } else {
    const patch =
      action === 'publish'
        ? { status: 'published', published_at: now, updated_at: now, deleted_at: null }
        : action === 'trash'
          ? { status: 'trash', deleted_at: now, updated_at: now }
          : { status: 'draft', updated_at: now, deleted_at: null }
    const { error } = await ctx.supabase
      .from('cms_documents')
      .update(patch)
      .eq('collection_slug', collectionSlug)
      .in('id', ids)
    if (error) return fromSupabaseError(error)
  }

  await recordCmsActivity(ctx.supabase, {
    actorId: userId,
    action: `bulk.${action}`,
    meta: { collection: collectionSlug, ids },
  })
  return apiBody({ data: { ok: true, count: ids.length } })
}

export async function handleAdminMenusList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'menus') {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const { data, error } = await ctx.supabase
    .from('cms_menus')
    .select('id, slug, locale, label, items, updated_at')
    .order('slug', { ascending: true })
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminMenuUpsert(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    !['POST', 'PUT', 'PATCH'].includes(ctx.method) ||
    ctx.segments[1] !== 'menus'
  ) {
    return null
  }
  if (ctx.segments.length !== 2 && ctx.segments.length !== 3) return null
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const body = await readJsonBody(ctx)
  const slug = String(body.slug ?? decodeSeg(ctx.segments[2] || '')).trim()
  const locale = String(body.locale ?? 'en').trim() || 'en'
  const label = String(body.label ?? slug).trim()
  const items = Array.isArray(body.items) ? body.items : []
  if (!slug) return apiError(400, 'slug required')

  const now = new Date().toISOString()
  const { data, error } = await ctx.supabase
    .from('cms_menus')
    .upsert(
      { slug, locale, label, items, updated_at: now },
      { onConflict: 'slug,locale' }
    )
    .select('id, slug, locale, label, items, updated_at')
    .single()
  if (error) return fromSupabaseError(error)
  return apiBody({ data })
}

export async function handleAdminCommentsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'comments'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.comments.moderate')
  if (!gate.ok) {
    const read = await requirePermission(ctx.supabase, userId, 'cms.read')
    if (!read.ok) return apiError(gate.status, gate.error)
  }
  const status = String(getQuery(ctx.event).status ?? '').trim()
  let q = ctx.supabase
    .from('cms_comments')
    .select(
      'id, document_id, author_name, author_email, body, status, created_at'
    )
    .order('created_at', { ascending: false })
    .limit(100)
  if (status) q = q.eq('status', status)
  const { data, error } = await q
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminCommentPatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'PATCH' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'comments'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.comments.moderate')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const id = decodeSeg(ctx.segments[2] || '')
  const body = await readJsonBody(ctx)
  const status = String(body.status ?? '').trim()
  if (!['pending', 'approved', 'spam', 'trash'].includes(status)) {
    return apiError(400, 'invalid status')
  }
  const { data, error } = await ctx.supabase
    .from('cms_comments')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, status, updated_at')
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Comment not found')
  return apiBody({ data })
}

export async function handleAdminContactList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'contact'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.contact.read')
  if (!gate.ok) {
    const read = await requirePermission(ctx.supabase, userId, 'cms.read')
    if (!read.ok) return apiError(gate.status, gate.error)
  }
  const { data, error } = await ctx.supabase
    .from('cms_contact_submissions')
    .select('id, name, email, type, message, status, created_at')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminContactPatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'PATCH' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'contact'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.contact.read')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const id = decodeSeg(ctx.segments[2] || '')
  const body = await readJsonBody(ctx)
  const status = String(body.status ?? '').trim()
  if (!['new', 'read', 'archived'].includes(status)) {
    return apiError(400, 'invalid status')
  }
  const { data, error } = await ctx.supabase
    .from('cms_contact_submissions')
    .update({ status })
    .eq('id', id)
    .select('id, status')
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Submission not found')
  return apiBody({ data })
}

export async function handleAdminTermsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'terms') {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.read')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const taxonomy = String(getQuery(ctx.event).taxonomy ?? '').trim()
  let q = ctx.supabase
    .from('cms_terms')
    .select('id, taxonomy, slug, name, locale, created_at')
    .order('name', { ascending: true })
  if (taxonomy) q = q.eq('taxonomy', taxonomy)
  const { data, error } = await q
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminTermCreate(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'POST' || ctx.segments.length !== 2 || ctx.segments[1] !== 'terms') {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const body = await readJsonBody(ctx)
  const taxonomy = String(body.taxonomy ?? 'category').trim()
  const name = String(body.name ?? '').trim()
  const slug = String(body.slug ?? name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
  const locale = String(body.locale ?? 'en').trim() || 'en'
  if (!name || !slug) return apiError(400, 'name and slug required')
  const { data, error } = await ctx.supabase
    .from('cms_terms')
    .insert({ taxonomy, name, slug, locale })
    .select('id, taxonomy, slug, name, locale')
    .single()
  if (error) return fromSupabaseError(error)
  return apiBody({ data }, 201)
}

export async function handleAdminTermDelete(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'DELETE' ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'terms'
  ) {
    return null
  }
  const gate = await requirePermission(ctx.supabase, userId, 'cms.write')
  if (!gate.ok) return apiError(gate.status, gate.error)
  const id = decodeSeg(ctx.segments[2] || '')
  const { error } = await ctx.supabase.from('cms_terms').delete().eq('id', id)
  if (error) return fromSupabaseError(error)
  return apiDeleted()
}
