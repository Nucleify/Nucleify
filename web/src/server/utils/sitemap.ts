import type { H3Event } from 'h3'

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

export const SITEMAP_HEADERS = {
  'content-type': 'application/xml; charset=utf-8',
  'cache-control':
    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  'x-content-type-options': 'nosniff',
} as const

const DEFAULT_ORIGIN = 'https://nucleify.io'

/** Escapes characters that are reserved or illegal in XML. */
export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Formats ISO 8601 datetime for <lastmod>; returns empty string on invalid/missing input. */
export function formatLastmod(
  timestamp?: string | number | Date | null
): string {
  if (!timestamp) return ''
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
  return Number.isNaN(date.getTime())
    ? ''
    : `<lastmod>${date.toISOString()}</lastmod>`
}

/** Standard fallback URLs when database or API is unreachable. */
export function getLocaleFallbackUrls(locale: string): SitemapEntry[] {
  return [
    { path: `/${locale}/home`, changefreq: 'daily', priority: 1.0 },
    { path: `/${locale}/investor`, changefreq: 'weekly', priority: 0.9 },
    { path: `/${locale}/blog`, changefreq: 'weekly', priority: 0.8 },
  ]
}

/** Resolves site origin from runtime config, environment or default. */
export function resolveSiteOrigin(event?: H3Event): string {
  if (event) {
    try {
      const config = useRuntimeConfig(event)
      const origin =
        config.public?.siteUrl ||
        config.public?.appUrl ||
        config.public?.webOrigin
      if (typeof origin === 'string' && origin.trim()) {
        return origin.trim().replace(/\/+$/, '')
      }
    } catch {
      // Standalone test context
    }
  }

  const envOrigin =
    process.env.NUXT_PUBLIC_SITE_URL ||
    process.env.NUXT_PUBLIC_APP_URL ||
    process.env.SITE_URL

  return envOrigin && typeof envOrigin === 'string' && envOrigin.trim()
    ? envOrigin.trim().replace(/\/+$/, '')
    : DEFAULT_ORIGIN
}

/** Serializes entries into XML format. */
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

/** Fetches URLs for a specific locale from /api/public/sitemap with graceful fallback. */
export async function fetchUrlsForLocale(
  locale: string
): Promise<SitemapEntry[]> {
  try {
    const body = await $fetch<{ data?: { urls?: SitemapEntry[] } }>(
      '/api/public/sitemap',
      { query: { locale } }
    )
    if (Array.isArray(body?.data?.urls) && body.data.urls.length > 0) {
      return body.data.urls
    }
  } catch {
    // Graceful fallback
  }
  return getLocaleFallbackUrls(locale)
}

/** Fetches and combines URLs across root and all supported locales without duplicates. */
export async function fetchAllSitemapUrls(): Promise<SitemapEntry[]> {
  const groups = await Promise.all(
    SUPPORTED_LOCALES.map((loc) => fetchUrlsForLocale(loc))
  )

  const seen = new Set<string>(['/'])
  const entries: SitemapEntry[] = [
    { path: '/', changefreq: 'daily', priority: 1.0 },
  ]

  for (const group of groups) {
    for (const entry of group) {
      const normalized = entry.path.startsWith('/')
        ? entry.path
        : `/${entry.path}`
      if (!seen.has(normalized)) {
        seen.add(normalized)
        entries.push(entry)
      }
    }
  }

  return entries
}
