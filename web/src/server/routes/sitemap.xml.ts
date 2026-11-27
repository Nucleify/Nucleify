import { defineEventHandler, getQuery, setResponseHeaders } from 'h3'

import {
  buildSitemapXml,
  fetchAllSitemapUrls,
  fetchUrlsForLocale,
  resolveSiteOrigin,
  SITEMAP_HEADERS,
} from '../utils/sitemap'

export * from '../utils/sitemap'

/**
 * Dynamic XML sitemap route for search engines and crawlers.
 */
export default defineEventHandler(async (event) => {
  const queryLocale = getQuery(event).locale
  const origin = resolveSiteOrigin(event)

  const entries =
    typeof queryLocale === 'string' && queryLocale.trim()
      ? await fetchUrlsForLocale(queryLocale.trim().toLowerCase())
      : await fetchAllSitemapUrls()

  setResponseHeaders(event, SITEMAP_HEADERS)
  return buildSitemapXml(entries, origin)
})
