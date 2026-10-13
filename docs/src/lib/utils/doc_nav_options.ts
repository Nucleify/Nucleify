import type { DocCategoryInterface } from '../types/interfaces'
import { resolveLocalized } from './resolve_localized'

export interface DocNavOptionInterface {
  title: string
  value: string
}

export function toDocNavValue(categorySlug: string, pageSlug: string): string {
  return `${categorySlug}/${pageSlug}`
}

export function buildDocNavOptions(
  categories: DocCategoryInterface[],
  lang = 'en',
): DocNavOptionInterface[] {
  return categories.flatMap((category) =>
    category.pages.map((page) => ({
      title: resolveLocalized(page.title, lang),
      value: toDocNavValue(category.slug, page.slug),
    })),
  )
}
