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
import { footerTemplateForPageSlug } from '../../cms/defaults/footer'

const MEDIA_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

async function resolveSeoOgImage(
  ctx: ApiContext,
  seo: unknown
): Promise<unknown> {
  if (!seo || typeof seo !== 'object' || Array.isArray(seo)) return seo
  const record = { ...(seo as Record<string, unknown>) }
  const raw = String(record.ogImage ?? '').trim()
  if (!raw || !MEDIA_UUID_RE.test(raw)) return record

  const { data } = await ctx.supabase
    .from('cms_media')
    .select('public_url, storage_path')
    .eq('id', raw)
    .is('deleted_at', null)
    .maybeSingle()
  if (!data) return record

  const direct = String(data.public_url || '').trim()
  if (direct) {
    record.ogImage = direct
    return record
  }
  const path = String(data.storage_path || '').trim()
  if (!path) return record
  const { data: publicData } = ctx.supabase.storage
    .from('cms-media')
    .getPublicUrl(path)
  const url = String(publicData?.publicUrl || '').trim()
  if (url) record.ogImage = url
  return record
}

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
      'id, collection_slug, locale, title, slug, status, published_at, data, updated_at, template'
    )
    .eq('collection_slug', 'pages')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('status', 'published')
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Page not found')

  const payload =
    data.data && typeof data.data === 'object'
      ? (data.data as Record<string, unknown>)
      : {}
  const rawSections = Array.isArray(payload.sections)
    ? (payload.sections as unknown[])
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

  const seo = await resolveSeoOgImage(ctx, payload.seo ?? null)
  return apiBody({
    data: {
      id: data.id,
      slug: data.slug,
      locale: data.locale,
      title: data.title,
      published_at: data.published_at,
      updated_at: data.updated_at,
      version: Number(payload.version ?? 1),
      sections,
      seo,
      enableIris: payload.enableIris !== false,
      showMenu: payload.showMenu === true,
      menuSlug:
        typeof payload.menuSlug === 'string' && payload.menuSlug.trim()
          ? payload.menuSlug.trim()
          : 'primary',
      showRail: payload.showRail !== false,
      showShear: payload.showShear !== false,
      showFooter: payload.showFooter !== false,
      footerMenuSlug:
        typeof payload.footerMenuSlug === 'string'
          ? payload.footerMenuSlug.trim()
          : '',
      footerTemplate:
        typeof payload.footerTemplate === 'string' &&
        payload.footerTemplate.trim()
          ? payload.footerTemplate.trim()
          : footerTemplateForPageSlug(String(data.slug ?? '')),
      template: String(data.template ?? 'rail').trim() || 'rail',
    },
  })
}
