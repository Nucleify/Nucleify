export type CmsRedirect = {
  from_path: string
  to_path: string
  status_code?: number
  enabled?: boolean
}

let cache: { at: number; rows: CmsRedirect[] } | null = null
const TTL_MS = 60_000

export async function loadCmsRedirects(
  fetchRows: () => Promise<CmsRedirect[]>
): Promise<CmsRedirect[]> {
  const now = Date.now()
  if (cache && now - cache.at < TTL_MS) return cache.rows
  try {
    const rows = await fetchRows()
    cache = { at: now, rows }
    return rows
  } catch {
    return cache?.rows ?? []
  }
}

/** Match pathname against enabled CMS redirects; return target + status or null. */
export function matchCmsRedirect(
  pathname: string,
  rows: CmsRedirect[]
): { to: string; statusCode: number } | null {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path.startsWith('/api') || path.startsWith('/_')) return null

  const match = rows.find((row) => {
    if (row.enabled === false) return false
    const from = String(row.from_path || '').replace(/\/$/, '') || '/'
    return from === path
  })
  if (!match) return null

  const to = String(match.to_path || '').trim()
  if (!to || to === path) return null
  const code = Number(match.status_code || 301)
  return { to, statusCode: Number.isFinite(code) ? code : 301 }
}

/** Test helper — clear redirect cache. */
export function clearCmsRedirectCache(): void {
  cache = null
}
