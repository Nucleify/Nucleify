import { marked, resetHeadingSlugCounters } from './markdown_renderer'

export async function parseMarkdown(markdown: string): Promise<string> {
  resetHeadingSlugCounters()
  const html = await marked.parse(markdown)
  const appUrl = typeof window !== 'undefined' ? window.location.origin : ''

  return html
    .replaceAll('/public', appUrl)
    .replaceAll('/documentation/', '/docs/')
}
