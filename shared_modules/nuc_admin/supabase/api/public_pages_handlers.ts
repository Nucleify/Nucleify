import {
  apiBody,
  apiError,
  apiNotHandled,
  decodeSeg,
  fromSupabaseError,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'
import { getQuery } from 'h3'

import { getCollectionConfig } from '../../cms/admin_config'

/** Public published page layout — no auth. */
export async function handlePublicPagesApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'public') return apiNotHandled()
  if (ctx.segments[1] !== 'pages') return apiNotHandled()
  if (ctx.method !== 'GET') return apiNotHandled()
  if (!getCollectionConfig('pages')) {
    return apiError(404, 'Pages collection unavailable')
  }

  const query = getQuery(ctx.event)
  const locale = String(query.locale ?? 'en').trim() || 'en'

  // GET /api/public/pages?locale=en — published slug list for SSR / static params.
  if (ctx.segments.length === 2) {
    const { data, error } = await ctx.supabase
      .from('cms_documents')
      .select('slug, locale')
      .eq('collection_slug', 'pages')
      .eq('status', 'published')
      .eq('locale', locale)
      .order('slug', { ascending: true })
    if (error) return fromSupabaseError(error)
    const slugs = [
      ...new Set(
        (data ?? [])
          .map((row) => String(row.slug || '').trim())
          .filter(Boolean)
      ),
    ]
    return apiBody({ data: { locale, slugs } })
  }

  if (ctx.segments.length !== 3) return apiNotHandled()

  const slug = decodeSeg(ctx.segments[2] || '')
  if (!slug) return apiError(400, 'slug required')

  const { data, error } = await ctx.supabase
    .from('cms_documents')
    .select(
      'id, collection_slug, locale, title, slug, status, published_at, data, updated_at'
    )
    .eq('collection_slug', 'pages')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('status', 'published')
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Page not found')

  const payload = data.data && typeof data.data === 'object' ? data.data : {}
  const rawSections = Array.isArray(
    (payload as { sections?: unknown }).sections
  )
    ? (payload as { sections: unknown[] }).sections
    : []

  const sections = rawSections.filter((item) => {
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

  return apiBody({
    data: {
      id: data.id,
      slug: data.slug,
      locale: data.locale,
      title: data.title,
      published_at: data.published_at,
      updated_at: data.updated_at,
      version: Number((payload as { version?: number }).version ?? 1),
      sections,
      seo: (payload as { seo?: unknown }).seo ?? null,
      enableIris: (payload as { enableIris?: boolean }).enableIris !== false,
    },
  })
}
