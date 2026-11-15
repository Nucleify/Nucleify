import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

import {
  type CmsRedirect,
  loadCmsRedirects,
  matchCmsRedirect,
} from '../cms_redirects'

/**
 * Apply enabled CMS redirects from admin (after smashed-url cleanup).
 * Skip /api and /_ before any fetch — otherwise loading redirects via
 * same-origin $fetch re-enters this middleware and deadlocks the request.
 */
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  if (path.startsWith('/api') || path.startsWith('/_')) return

  const rows = await loadCmsRedirects(async () => {
    const body = await $fetch<{ data?: CmsRedirect[] }>(
      `${url.origin}/api/public/redirects`
    )
    return Array.isArray(body?.data) ? body.data : []
  })

  const match = matchCmsRedirect(path, rows)
  if (!match) return
  return sendRedirect(event, match.to, match.statusCode)
})
