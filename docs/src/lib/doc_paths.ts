import { DOC_CATEGORIES } from './constants/docs'
import { DOC_LANGUAGES, DEFAULT_LANG } from './constants/languages'
import type { DocPageInterface } from './types/interfaces'
import { resolveLocalized } from './utils/resolve_localized'

export type DocRouteParams = {
  lang: string
  category: string
  slug: string
}

export type ResolvedDocPage = {
  categoryName: string
  page: DocPageInterface & { title: string }
}

export function getAllDocRoutes(): DocRouteParams[] {
  const routes: DocRouteParams[] = []
  for (const lang of DOC_LANGUAGES) {
    for (const category of DOC_CATEGORIES) {
      for (const page of category.pages) {
        routes.push({ lang: lang.code, category: category.slug, slug: page.slug })
      }
    }
  }
  return routes
}

export function findDocPage(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG,
): ResolvedDocPage | null {
  const cat = DOC_CATEGORIES.find((c) => c.slug === category)
  const page = cat?.pages.find((p) => p.slug === slug)
  if (!cat || !page) return null
  return {
    categoryName: resolveLocalized(cat.name, lang),
    page: { ...page, title: resolveLocalized(page.title, lang) },
  }
}

export function docHref(lang: string, category: string, slug: string): string {
  return `/${lang}/docs/${category}/${slug}`
}

export const DEFAULT_DOC_ROUTE = {
  lang: 'en',
  category: 'getting-started',
  slug: 'introduction',
} as const
