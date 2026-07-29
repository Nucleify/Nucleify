import type { DocContent } from 'nucleify'
import { DEFAULT_LANG, markdownRawToDocContent } from 'nucleify'

import { readMarkdownFile } from './read_markdown_file.server'

export async function loadDocContentServer(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG
): Promise<DocContent> {
  const raw = await readMarkdownFile(lang, category, slug)
  return markdownRawToDocContent(raw)
}
