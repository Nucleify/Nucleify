import {
  defineEventHandler,
  getQuery,
  type H3Event,
  setResponseHeaders,
} from 'h3'

import { useRuntimeConfig } from 'nitropack/runtime'

export interface SitemapEntry {
  path: string
  updated_at?: string | number | Date | null
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}

export const SUPPORTED_LOCALES = ['en', 'pl', 'vn'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

const DEFAULT_ORIGIN = 'https://nucleify.io'
const CACHE_CONTROL_HEADER =
  'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'

/**
 * Escapes characters that are reserved or illegal in XML.
 */
export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Safely parses and formats ISO 8601 datetime for <lastmod>.
 * Returns empty string on invalid or missing date without throwing.
 */
export function formatLastmod(
  timestamp?: string | number | Date | null
): string {
  if (!timestamp) return ''
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
  if (Number.isNaN(date.getTime())) return ''
  return `<lastmod>${date.toISOString()}</lastmod>`
}

/**
 * Returns default static fallback URLs for a given locale.
 */
export function getLocaleFallbackUrls(locale: string): SitemapEntry[] {
  return [
    {
      path: `/${locale}/home`,
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      path: `/${locale}/investor`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      path: `/${locale}/blog`,
      changefreq: 'weekly',
      priority: 0.8,
    },
  ]
}

/**
 * Resolves the canonical site origin from runtime config, environment or fallback.
 */
export function resolveSiteOrigin(event?: H3Event): string {
  if (event) {
    try {
      const config = useRuntimeConfig(event)
      const configured =
        config.public?.siteUrl ||
        config.public?.appUrl ||
        config.public?.webOrigin
      if (typeof configured === 'string' && configured.trim()) {
        return configured.trim().replace(/\/+$/, '')
      }
    } catch {
      // Runtime config not available (e.g. standalone test context)
    }
  }

  const envOrigin =
    process.env.NUXT_PUBLIC_SITE_URL ||
    process.env.NUXT_PUBLIC_APP_URL ||
    process.env.SITE_URL

  if (envOrigin && typeof envOrigin === 'string' && envOrigin.trim()) {
    return envOrigin.trim().replace(/\/+$/, '')
  }

  return DEFAULT_ORIGIN
}

/**
 * Builds valid sitemap XML string from entries and base origin.
 */
export function buildSitemapXml(
  entries: SitemapEntry[],
  origin: string
): string {
  const cleanOrigin = origin.replace(/\/+$/, '')

  const items = entries.map((entry) => {
    const rawPath = entry.path.startsWith('/') ? entry.path : `/${entry.path}`
    const loc = escapeXml(`${cleanOrigin}${rawPath}`)
    const lastmod = formatLastmod(entry.updated_at)
    const changefreq = entry.changefreq
      ? `<changefreq>${entry.changefreq}</changefreq>`
      : ''
    const priority =
      typeof entry.priority === 'number'
        ? `<priority>${entry.priority.toFixed(1)}</priority>`
        : ''

    return `  <url><loc>${loc}</loc>${lastmod}${changefreq}${priority}</url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}
</urlset>`
}

async function fetchUrlsForLocale(locale: string): Promise<SitemapEntry[]> {
  try {
    const body = await $fetch<{
      data?: { urls?: SitemapEntry[] }
    }>('/api/public/sitemap', {
      query: { locale },
    })
    const urls = body?.data?.urls
    if (Array.isArray(urls) && urls.length > 0) {
      return urls
    }
  } catch {
    // Graceful fallback when database is unconfigured or request fails
  }
  return getLocaleFallbackUrls(locale)
}

/**
 * XML sitemap route handler from published CMS pages + posts.
 * Serves single locale if requested (?locale=xx) or all supported locales.
 */
export default defineEventHandler(async (event) => {
  const queryLocale = getQuery(event).locale
  const origin = resolveSiteOrigin(event)

  let entries: SitemapEntry[] = []

  if (typeof queryLocale === 'string' && queryLocale.trim()) {
    const locale = queryLocale.trim().toLowerCase()
    entries = await fetchUrlsForLocale(locale)
  } else {
    // Default sitemap: include root + all supported locales in parallel
    const localeResults = await Promise.all(
      SUPPORTED_LOCALES.map((loc) => fetchUrlsForLocale(loc))
    )

    const seenPaths = new Set<string>()
    entries.push({
      path: '/',
      changefreq: 'daily',
      priority: 1.0,
    })
    seenPaths.add('/')

    for (const group of localeResults) {
      for (const entry of group) {
        const normalized = entry.path.startsWith('/')
          ? entry.path
          : `/${entry.path}`
        if (!seenPaths.has(normalized)) {
          seenPaths.add(normalized)
          entries.push(entry)
        }
      }
    }
  }

  const xml = buildSitemapXml(entries, origin)

  setResponseHeaders(event, {
    'content-type': 'application/xml; charset=utf-8',
    'cache-control': CACHE_CONTROL_HEADER,
    'x-content-type-options': 'nosniff',
  })

  return xml
})
