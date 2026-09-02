import type { DocHeadingInterface } from '../types/interfaces'

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function headingInnerToPlain(html: string): string {
  return decodeHtmlEntities(
    html
      .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '$1')
      .replace(/<[^>]+>/g, ''),
  ).trim()
}

function sanitizeHeadingHtml(html: string): string {
  return html.replace(/<\/?(?!code\b|em\b|strong\b)(\w+)[^>]*>/gi, '').trim()
}

export function parseHeadings(html: string): DocHeadingInterface[] {
  const headingRegex = /<h([2-6])[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/gi
  const result: DocHeadingInterface[] = []
  const stack: DocHeadingInterface[] = []

  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]!, 10)
    const id = match[2] || ''
    const rawHtml = match[3]?.trim() || ''
    const text = headingInnerToPlain(rawHtml)
    const headingHtml = sanitizeHeadingHtml(rawHtml)

    if (!id || !text) continue

    const headingObj: DocHeadingInterface = {
      id,
      text,
      html: headingHtml,
      level,
    }

    while (stack.length > 0 && stack[stack.length - 1]!.level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      result.push(headingObj)
      stack.push(headingObj)
    } else {
      const parent = stack[stack.length - 1]!
      parent.children ??= []
      parent.children.push(headingObj)
      stack.push(headingObj)
    }
  }

  return result
}
