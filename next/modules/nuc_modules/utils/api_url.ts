/**
 * Laravel `nuc_modules` API routes live under `/api/modules/...` (see `routes/api.php`).
 *
 * `NEXT_PUBLIC_API_URL` may be:
 * - origin only, e.g. `http://127.0.0.1:8000` → we prepend `/api` to module paths.
 * - API root, e.g. `http://127.0.0.1:8000/api` → paths stay `/modules/...`.
 *
 * If unset, returns a relative `/api/...` URL so the browser hits Next and
 * `next.config` rewrites forward to Laravel (see `rewrites` there).
 */
export function nucModulesApiUrl(path: string): string {
  const rawBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? ''
  const suffix = path.startsWith('/') ? path : `/${path}`

  const pathHasApiPrefix = suffix === '/api' || suffix.startsWith('/api/')
  const baseEndsWithApi = /\/api$/.test(rawBase)

  let apiPath = suffix
  if (!pathHasApiPrefix) {
    apiPath = baseEndsWithApi ? suffix : `/api${suffix}`
  } else if (baseEndsWithApi) {
    apiPath = suffix.replace(/^\/api(?=\/|$)/, '') || '/'
  }

  if (!rawBase) return apiPath
  return `${rawBase}${apiPath}`
}
