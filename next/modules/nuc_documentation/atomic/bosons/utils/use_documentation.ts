import { DOC_CATEGORIES } from '../constants/documentation'
import { DEFAULT_LANG } from '../constants/languages'
import { readMarkdownFileAction } from './content_actions'
import { parseMarkdown } from './parse_markdown'

export interface UseDocumentationInterface {
  prefetchFirstPage: (lang?: string) => Promise<void>
  prefetchAll: (lang?: string) => Promise<void>
}

export function useDocumentation(): UseDocumentationInterface {
  async function prefetchFirstPage(lang: string = DEFAULT_LANG): Promise<void> {
    const firstCategory = DOC_CATEGORIES[0]
    const firstPage = firstCategory.pages[0]
    await readMarkdownFileAction(lang, firstCategory.slug, firstPage.slug)
  }

  async function prefetchAll(lang: string = DEFAULT_LANG): Promise<void> {
    const requests = DOC_CATEGORIES.flatMap((category) =>
      category.pages.map(async (page) => {
        const markdown = await readMarkdownFileAction(
          lang,
          category.slug,
          page.slug
        )
        return parseMarkdown(markdown)
      })
    )
    await Promise.all(requests)
  }

  return {
    prefetchFirstPage,
    prefetchAll,
  }
}
