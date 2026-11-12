import {
  defineEventHandler,
  getRequestURL,
  type H3Event,
  sendRedirect,
} from 'h3'

type CmsRedirect = {
  from_path: string
  to_path: string
  status_code?: number
  enabled?: boolean
}

let cache: { at: number; rows: CmsRedirect[] } | null = null
const TTL_MS = 60_000

async function loadRedirects(event: H3Event): Promise<CmsRedirect[]> {
  const now = Date.now()
  if (cache && now - cache.at < TTL_MS) return cache.rows
  try {
    const origin = getRequestURL(event).origin
    const body = await $fetch<{ data?: CmsRedirect[] }>(
      `${origin}/api/public/redirects`
    )
    const rows = Array.isArray(body?.data) ? body.data : []
    cache = { at: now, rows }
    return rows
  } catch {
    return cache?.rows ?? []
  }
}

/**
 * Apply enabled CMS redirects from admin (after smashed-url cleanup).
 */
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname.replace(/\/$/, '') || '/'
  if (path.startsWith('/api') || path.startsWith('/_')) return

  const rows = await loadRedirects(event)
  const match = rows.find((row) => {
    if (row.enabled === false) return false
    const from = String(row.from_path || '').replace(/\/$/, '') || '/'
    return from === path
  })
  if (!match) return

  const to = String(match.to_path || '').trim()
  if (!to || to === path) return
  const code = Number(match.status_code || 301)
  return sendRedirect(event, to, Number.isFinite(code) ? code : 301)
})
