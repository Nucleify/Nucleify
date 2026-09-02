import type { DocCategoryInterface } from '../types/interfaces'

export interface DocNavOptionInterface {
  title: string
  value: string
}

export function toDocNavValue(categorySlug: string, pageSlug: string): string {
  return `${categorySlug}/${pageSlug}`
}

export function buildDocNavOptions(
  categories: DocCategoryInterface[],
): DocNavOptionInterface[] {
  return categories.flatMap((category) =>
    category.pages.map((page) => ({
      title: page.title,
      value: toDocNavValue(category.slug, page.slug),
    })),
  )
}
