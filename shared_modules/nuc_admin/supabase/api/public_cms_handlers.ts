import {
  apiBody,
  apiError,
  apiNotHandled,
  decodeSeg,
  fromSupabaseError,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'
import { getQuery, readBody } from 'h3'

import { verifyPreviewToken } from '../../cms/preview_token'

function filterVisibleSections(rawSections: unknown[]): unknown[] {
  return rawSections.filter((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return false
    const props = (item as { props?: unknown }).props
    if (!props || typeof props !== 'object' || Array.isArray(props)) return true
    const show = (props as { showSection?: unknown }).showSection
    return !(
      show === false ||
      show === 0 ||
      show === '0' ||
      show === 'false'
    )
  })
}

function documentPayload(data: Record<string, unknown>) {
  const payload =
    data.data && typeof data.data === 'object'
      ? (data.data as Record<string, unknown>)
      : {}
  const rawSections = Array.isArray(payload.sections)
    ? (payload.sections as unknown[])
    : Array.isArray(payload.body)
      ? (payload.body as unknown[])
      : []
  return {
    id: data.id,
    slug: data.slug,
    locale: data.locale,
    title: data.title,
    collection_slug: data.collection_slug,
    published_at: data.published_at,
    updated_at: data.updated_at,
    template: data.template ?? 'default',
    version: Number(payload.version ?? 1),
    sections: filterVisibleSections(
      Array.isArray(payload.sections) ? (payload.sections as unknown[]) : []
    ),
    body: Array.isArray(payload.body) ? payload.body : [],
    excerpt: typeof payload.excerpt === 'string' ? payload.excerpt : '',
    featuredImage:
      typeof payload.featuredImage === 'string' ? payload.featuredImage : '',
    seo: payload.seo ?? null,
    enableIris: payload.enableIris !== false,
  }
}

/** Public CMS surfaces: preview, globals, redirects, posts, comments, sitemap. */
export async function handlePublicCmsApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'public') return apiNotHandled()

  // GET /api/public/preview/:slug?token=&locale=
  if (ctx.segments[1] === 'preview' && ctx.method === 'GET') {
    if (ctx.segments.length !== 3) return apiNotHandled()
    const slug = decodeSeg(ctx.segments[2] || '')
    const query = getQuery(ctx.event)
    const token = String(query.token ?? '')
    const locale = String(query.locale ?? 'en').trim() || 'en'
    const verified = verifyPreviewToken(token)
    if (!verified || verified.slug !== slug || verified.locale !== locale) {
      return apiError(403, 'Invalid or expired preview token')
    }
    const { data, error } = await ctx.supabase
      .from('cms_documents')
      .select(
        'id, collection_slug, locale, title, slug, status, published_at, data, updated_at, template'
      )
      .eq('collection_slug', verified.collection)
      .eq('slug', slug)
      .eq('locale', locale)
      .neq('status', 'trash')
      .maybeSingle()
    if (error) return fromSupabaseError(error)
    if (!data) return apiError(404, 'Document not found')
    return apiBody({
      data: { ...documentPayload(data as Record<string, unknown>), preview: true },
    })
  }

  // GET /api/public/globals/:slug?locale=
  if (ctx.segments[1] === 'globals' && ctx.method === 'GET') {
    if (ctx.segments.length !== 3) return apiNotHandled()
    const globalSlug = decodeSeg(ctx.segments[2] || '')
    const locale = String(getQuery(ctx.event).locale ?? 'en').trim() || 'en'
    const { data, error } = await ctx.supabase
      .from('cms_global_documents')
      .select('global_slug, locale, status, data, updated_at')
      .eq('global_slug', globalSlug)
      .eq('locale', locale)
      .eq('status', 'published')
      .maybeSingle()
    if (error) return fromSupabaseError(error)
    if (!data) {
      return apiBody({
        data: { slug: globalSlug, locale, data: {}, source: 'missing' },
      })
    }
    return apiBody({
      data: {
        slug: data.global_slug,
        locale: data.locale,
        data: data.data ?? {},
        updated_at: data.updated_at,
        source: 'cms',
      },
    })
  }

  // GET /api/public/redirects
  if (
    ctx.segments[1] === 'redirects' &&
    ctx.method === 'GET' &&
    ctx.segments.length === 2
  ) {
    const { data, error } = await ctx.supabase
      .from('cms_redirects')
      .select('from_path, to_path, status_code, enabled')
      .eq('enabled', true)
      .order('from_path', { ascending: true })
    if (error) return fromSupabaseError(error)
    return apiBody({ data: data ?? [] })
  }

  // GET /api/public/menus/:slug?locale=
  if (ctx.segments[1] === 'menus' && ctx.method === 'GET') {
    if (ctx.segments.length !== 3) return apiNotHandled()
    const menuSlug = decodeSeg(ctx.segments[2] || '')
    const locale = String(getQuery(ctx.event).locale ?? 'en').trim() || 'en'
    const { data, error } = await ctx.supabase
      .from('cms_menus')
      .select('slug, locale, label, items, updated_at')
      .eq('slug', menuSlug)
      .eq('locale', locale)
      .maybeSingle()
    if (error) return fromSupabaseError(error)
    if (!data) {
      return apiBody({
        data: { slug: menuSlug, locale, items: [], source: 'missing' },
      })
    }
    return apiBody({
      data: {
        slug: data.slug,
        locale: data.locale,
        label: data.label,
        items: data.items ?? [],
        source: 'cms',
      },
    })
  }

  // GET /api/public/posts?locale=  |  GET /api/public/posts/:slug
  if (ctx.segments[1] === 'posts' && ctx.method === 'GET') {
    const locale = String(getQuery(ctx.event).locale ?? 'en').trim() || 'en'
    if (ctx.segments.length === 2) {
      const { data, error } = await ctx.supabase
        .from('cms_documents')
        .select(
          'id, slug, locale, title, published_at, updated_at, data, template'
        )
        .eq('collection_slug', 'posts')
        .eq('status', 'published')
        .eq('locale', locale)
        .order('published_at', { ascending: false })
        .limit(50)
      if (error) return fromSupabaseError(error)
      const posts = (data ?? []).map((row) => {
        const payload =
          row.data && typeof row.data === 'object'
            ? (row.data as Record<string, unknown>)
            : {}
        return {
          id: row.id,
          slug: row.slug,
          locale: row.locale,
          title: row.title,
          published_at: row.published_at,
          excerpt: typeof payload.excerpt === 'string' ? payload.excerpt : '',
          featuredImage:
            typeof payload.featuredImage === 'string'
              ? payload.featuredImage
              : '',
          seo: payload.seo ?? null,
        }
      })
      return apiBody({ data: { locale, posts } })
    }
    if (ctx.segments.length === 3) {
      const slug = decodeSeg(ctx.segments[2] || '')
      const { data, error } = await ctx.supabase
        .from('cms_documents')
        .select(
          'id, collection_slug, locale, title, slug, status, published_at, data, updated_at, template'
        )
        .eq('collection_slug', 'posts')
        .eq('slug', slug)
        .eq('locale', locale)
        .eq('status', 'published')
        .maybeSingle()
      if (error) return fromSupabaseError(error)
      if (!data) return apiError(404, 'Post not found')
      return apiBody({
        data: documentPayload(data as Record<string, unknown>),
      })
    }
  }

  // GET /api/public/comments/:documentId  |  POST /api/public/comments
  if (ctx.segments[1] === 'comments') {
    if (ctx.method === 'GET' && ctx.segments.length === 3) {
      const documentId = decodeSeg(ctx.segments[2] || '')
      const { data, error } = await ctx.supabase
        .from('cms_comments')
        .select('id, author_name, body, created_at')
        .eq('document_id', documentId)
        .eq('status', 'approved')
        .order('created_at', { ascending: true })
        .limit(200)
      if (error) return fromSupabaseError(error)
      return apiBody({ data: data ?? [] })
    }
    if (ctx.method === 'POST' && ctx.segments.length === 2) {
      const body = (await readBody(ctx.event)) as Record<string, unknown>
      const documentId = String(body.documentId ?? '').trim()
      const authorName = String(body.authorName ?? '').trim().slice(0, 120)
      const authorEmail = String(body.authorEmail ?? '').trim().slice(0, 200)
      const text = String(body.body ?? '').trim().slice(0, 4000)
      if (!documentId || !authorName || !text) {
        return apiError(400, 'documentId, authorName, and body required')
      }
      const { data: doc } = await ctx.supabase
        .from('cms_documents')
        .select('id, collection_slug, status')
        .eq('id', documentId)
        .eq('collection_slug', 'posts')
        .eq('status', 'published')
        .maybeSingle()
      if (!doc) return apiError(404, 'Post not found')
      const { data, error } = await ctx.supabase
        .from('cms_comments')
        .insert({
          document_id: documentId,
          author_name: authorName,
          author_email: authorEmail,
          body: text,
          status: 'pending',
        })
        .select('id, status, created_at')
        .single()
      if (error) return fromSupabaseError(error)
      return apiBody({ data }, 201)
    }
  }

  // GET /api/public/sitemap?locale=
  if (
    ctx.segments[1] === 'sitemap' &&
    ctx.method === 'GET' &&
    ctx.segments.length === 2
  ) {
    const locale = String(getQuery(ctx.event).locale ?? 'en').trim() || 'en'
    const { data: pages, error: pagesError } = await ctx.supabase
      .from('cms_documents')
      .select('slug, collection_slug, updated_at, published_at, data')
      .eq('status', 'published')
      .eq('locale', locale)
      .in('collection_slug', ['pages', 'posts'])
    if (pagesError) return fromSupabaseError(pagesError)
    const urls = (pages ?? [])
      .filter((row) => {
        const seo =
          row.data && typeof row.data === 'object'
            ? ((row.data as { seo?: { robots?: string } }).seo ?? {})
            : {}
        return !String(seo.robots || '').includes('noindex')
      })
      .map((row) => ({
        path:
          row.collection_slug === 'posts'
            ? `/${locale}/blog/${row.slug}`
            : `/${locale}/${row.slug}`,
        updated_at: row.updated_at,
        published_at: row.published_at,
        collection: row.collection_slug,
      }))
    return apiBody({ data: { locale, urls } })
  }

  return apiNotHandled()
}
