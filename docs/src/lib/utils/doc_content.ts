import type { DocHeadingInterface } from 'nucleify'
import { parseHeadings, parseMarkdown } from 'nucleify'

export interface DocContent {
  html: string
  headings: DocHeadingInterface[]
}

export async function markdownRawToDocContent(
  raw: string
): Promise<DocContent> {
  const html = await parseMarkdown(raw)
  const headings = parseHeadings(html)
  return { html, headings }
}
