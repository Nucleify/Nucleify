import { DEFAULT_LANG } from '../constants/languages'
import { DOC_CATEGORIES } from '../constants/docs'
import type { DocPageInterface } from '../types/interfaces'
import { fetchDocMarkdownApi } from './fetch_doc_markdown'
import { parseMarkdown } from './parse_markdown'

export interface UseDocsInterface {
  prefetchFirstPage: (lang?: string) => Promise<void>
  prefetchAll: (lang?: string) => Promise<void>
}

export function useDocs(): UseDocsInterface {
  async function prefetchFirstPage(lang: string = DEFAULT_LANG): Promise<void> {
    const firstCategory = DOC_CATEGORIES[0]
    const firstPage = firstCategory.pages[0]

    await fetchDocMarkdownApi(lang, firstCategory.slug, firstPage.slug)
  }

  async function prefetchAll(lang: string = DEFAULT_LANG): Promise<void> {
    const requests = DOC_CATEGORIES.flatMap((category) =>
      category.pages.map((page: DocPageInterface) =>
        fetchDocMarkdownApi(lang, category.slug, page.slug).then(parseMarkdown)
      )
    )

    await Promise.all(requests)
  }

  return { prefetchFirstPage, prefetchAll }
}
