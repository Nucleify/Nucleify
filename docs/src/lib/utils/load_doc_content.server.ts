import type { DocContent } from './doc_content'
import { DEFAULT_LANG } from '../constants/languages'
import { markdownRawToDocContent } from './doc_content'
import { readMarkdownFile } from './read_markdown_file.server'

export async function loadDocContentServer(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG,
): Promise<DocContent> {
  const raw = await readMarkdownFile(lang, category, slug)
  return markdownRawToDocContent(raw)
}
