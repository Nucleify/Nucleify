import { defineNitroPlugin } from 'nitropack/runtime'
// @ts-expect-error virtual module generated at build time by nitro hooks
import { INLINE_CSS_MAP } from '#nuc-inline-css'

const STYLESHEET_LINK_RE =
  /<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/gi

const FONT_URL_RE = /url\(\s*['"]?([^'")\s]+\.woff2)['"]?\s*\)/gi

/** Nuxt renderer payload — not in base NitroRuntimeHooks used by web/tsconfig. */
type HtmlRenderContext = {
  head: string[]
}

type HtmlRenderHooks = {
  hook: (name: 'render:html', fn: (html: HtmlRenderContext) => void) => void
}

function fontPreloadsFromCss(css: string): string[] {
  const urls = new Set<string>()
  for (const match of css.matchAll(FONT_URL_RE)) {
    const raw = match[1]
    if (!raw) continue
    const href = raw.startsWith('/')
      ? raw
      : `/_nuxt/${raw.replace(/^\.\//, '')}`
    urls.add(href)
  }

  const preferred = [...urls].filter(
    (u) =>
      u.includes('JetBrains_Mono-normal-650') ||
      u.includes('JetBrains_Mono-normal-600') ||
      u.includes('Instrument_Sans-normal-400') ||
      u.includes('Instrument_Sans-normal-600')
  )
  const list = (preferred.length ? preferred : [...urls]).slice(0, 4)

  return list.map(
    (href) =>
      `<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`
  )
}

/**
 * Inline small `/_nuxt/*.css` from the build-time map (no self-fetch — works on CF).
 * Also inject font preloads so woff2 starts in parallel with HTML parse.
 */
export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) return

  const hooks = nitroApp.hooks as unknown as HtmlRenderHooks

  hooks.hook('render:html', (html) => {
    const nextHead: string[] = []
    const preloads: string[] = []

    for (const chunk of html.head) {
      if (
        !chunk.includes('rel="stylesheet"') &&
        !chunk.includes("rel='stylesheet'")
      ) {
        nextHead.push(chunk)
        continue
      }

      let rewritten = chunk
      for (const match of chunk.matchAll(STYLESHEET_LINK_RE)) {
        const full = match[0]
        const href = match[1]
        if (!href) continue
        const css = (INLINE_CSS_MAP as Record<string, string>)[href]
        if (!css) continue

        rewritten = rewritten.replace(
          full,
          `<style data-inline-css="${href}">${css}</style>`
        )
        for (const tag of fontPreloadsFromCss(css)) {
          if (!preloads.includes(tag)) preloads.push(tag)
        }
      }
      nextHead.push(rewritten)
    }

    html.head = [...preloads, ...nextHead]
  })
})
