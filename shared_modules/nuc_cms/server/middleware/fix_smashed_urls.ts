import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

import { redirectTargetForPath } from '../../utils/smashed_url'

/**
 * Collapse legacy smashed / dead marketing URLs (GSC 400+ junk paths) onto home.
 * Caused by historic canonical: `route.path.replace(/\//g, '')`.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const target = redirectTargetForPath(url.pathname)
  if (!target || target === url.pathname) return

  return sendRedirect(event, target, 301)
})
