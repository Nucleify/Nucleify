/** Localized marketing route, e.g. `/en/home`. */
export function pageHref(lang: string, slug: string): string {
  const locale = lang.trim() || 'en'
  const path = slug.replace(/^\/+/, '').replace(/\/+$/, '')
  return `/${locale}/${path}`
}
