import type { Tokens } from 'marked'
import { marked } from 'marked'

import { slugify } from '.'

import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import php from 'highlight.js/lib/languages/php'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('php', php)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)

function escapeHtmlForCodeBlock(raw: string): string {
  return raw
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

const renderer = new marked.Renderer()

const headingSlugCount = new Map<string, number>()

export function resetHeadingSlugCounters(): void {
  headingSlugCount.clear()
}

renderer.heading = (token: Tokens.Heading) => {
  const level = token.depth
  const text = token.text
  const base = slugify(text)
  const n = headingSlugCount.get(base) ?? 0
  headingSlugCount.set(base, n + 1)
  const id = n === 0 ? base : `${base}-${n}`
  const tag = `h${level}`
  return `<${tag} id="${id}">${text}</${tag}>`
}

renderer.code = (token: Tokens.Code) => {
  let innerHtml: string
  let hasHighlighting = false

  if (token.lang && hljs.getLanguage(token.lang)) {
    try {
      innerHtml = hljs.highlight(token.text, {
        language: token.lang,
      }).value
      hasHighlighting = true
    } catch (err) {
      console.error('Highlight.js error:', err)
      innerHtml = escapeHtmlForCodeBlock(token.text)
    }
  } else {
    innerHtml = escapeHtmlForCodeBlock(token.text)
  }

  const langClass = token.lang ? ` class="language-${token.lang}"` : ''
  const hljsClass = hasHighlighting ? ' hljs' : ''
  return `<pre><code${langClass}${hljsClass}>${innerHtml}</code></pre>`
}

marked.setOptions({
  renderer,
})

export { marked }
