import type { DocHeadingInterface } from '../types/interfaces'
import { parseHeadings } from './parse_headings'
import { parseMarkdown } from './parse_markdown'

export interface DocContent {
  html: string
  headings: DocHeadingInterface[]
}

/** Page chrome already renders the title - drop the leading markdown H1. */
function stripLeadingH1(html: string): string {
  return html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, '')
}

export async function markdownRawToDocContent(raw: string): Promise<DocContent> {
  const html = stripLeadingH1(await parseMarkdown(raw))
  const headings = parseHeadings(html)
  return { html, headings }
}
