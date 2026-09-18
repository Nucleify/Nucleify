import type { DocHeadingInterface } from '../types/interfaces'
import { parseHeadings } from './parse_headings'
import { parseMarkdown } from './parse_markdown'

export interface DocContent {
  html: string
  headings: DocHeadingInterface[]
}

export async function markdownRawToDocContent(raw: string): Promise<DocContent> {
  const html = await parseMarkdown(raw)
  const headings = parseHeadings(html)
  return { html, headings }
}
