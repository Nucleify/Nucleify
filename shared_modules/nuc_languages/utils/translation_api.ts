import type { TranslationPageQuery } from 'nucleify'

export function unwrapApiBody<T>(raw: unknown): T | undefined {
  if (raw && typeof raw === 'object' && 'data' in raw) {
    return (raw as { data: T }).data
  }
  return raw as T
}

export const PER_PAGE = 100

export function buildTranslationsPageUrl(query: TranslationPageQuery): string {
  const params = new URLSearchParams({
    locale: query.locale,
    page: String(query.page),
    per_page: String(query.perPage ?? PER_PAGE),
  })

  if (query.category) params.set('category', query.category)
  if (query.search?.trim()) params.set('search', query.search.trim())

  return `/translations?${params.toString()}`
}
