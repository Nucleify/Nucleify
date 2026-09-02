import { marked, resetHeadingSlugCounters } from '../markdown/markdown_renderer'
import { dedupeLeadingDocumentationHeadings } from './dedupe_doc_headings'

export async function parseMarkdown(markdown: string): Promise<string> {
  resetHeadingSlugCounters()
  const rawHtml = await marked.parse(markdown)
  const html = dedupeLeadingDocumentationHeadings(rawHtml)
  const appUrl = typeof window !== 'undefined' ? window.location.origin : ''

  return html.replaceAll('/public', appUrl).replaceAll('/documentation/', '/docs/')
}
