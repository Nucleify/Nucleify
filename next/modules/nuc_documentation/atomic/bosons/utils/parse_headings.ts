import type { DocHeadingInterface } from '../types'

export function parseHeadings(html: string): DocHeadingInterface[] {
  const headingRegex = /<h([2-6])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[2-6]>/gi
  const result: DocHeadingInterface[] = []
  const stack: DocHeadingInterface[] = []

  let match
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10)
    const id = match[2] || ''
    const text = match[3]?.trim() || ''

    if (!id || !text) continue

    const headingObj: DocHeadingInterface = {
      id,
      text,
      level,
    }

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      result.push(headingObj)
      stack.push(headingObj)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(headingObj)
      stack.push(headingObj)
    }
  }

  return result
}
