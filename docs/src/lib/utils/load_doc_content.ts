import {
  DEFAULT_LANG,
  type DocContent,
  docMarkdownNotFoundError,
  markdownRawToDocContent,
} from 'nucleify'

import { getBundledMarkdown } from './markdown_bundle.generated'

export async function loadDocContentClient(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG
): Promise<DocContent> {
  const bundled = getBundledMarkdown(lang, category, slug)
  if (bundled === null) {
    throw new Error(docMarkdownNotFoundError(lang, category, slug))
  }
  return markdownRawToDocContent(bundled)
}

export async function loadDocContent(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG
): Promise<DocContent> {
  return loadDocContentClient(category, slug, lang)
}
