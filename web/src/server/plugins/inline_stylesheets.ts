import { defineNitroPlugin } from 'nitropack/runtime'

/**
 * Tiny list of woff2 hrefs, filled on `nitro:compiled` (see hooks.ts).
 */
const FONT_PRELOAD_RAW = '__NUC_FONT_PRELOADS_JSON__'

function readFontPreloads(): string[] {
  if (FONT_PRELOAD_RAW.startsWith('__NUC_')) return []
  try {
    const parsed = JSON.parse(FONT_PRELOAD_RAW) as unknown
    return Array.isArray(parsed)
      ? parsed.filter((u): u is string => typeof u === 'string')
      : []
  } catch {
    return []
  }
}

const FONT_PRELOADS = readFontPreloads()

/** Nuxt renderer payload - not in base NitroRuntimeHooks used by web/tsconfig. */
type HtmlRenderContext = {
  head: string[]
}

type HtmlRenderHooks = {
  hook: (name: 'render:html', fn: (html: HtmlRenderContext) => void) => void
}

function fontPreloadTags(hrefs: string[]): string[] {
  return hrefs
    .slice(0, 4)
    .map(
      (href) =>
        `<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`
    )
}

/**
 * Keep Nuxt CSS render-blocking (async sheet FOUCs + CLS when critical CSS is incomplete).
 * Only inject font preloads so woff2 starts in parallel with the stylesheet.
 */
export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) return

  const hooks = nitroApp.hooks as unknown as HtmlRenderHooks

  hooks.hook('render:html', (html) => {
    const preloads = fontPreloadTags(FONT_PRELOADS)
    if (preloads.length === 0) return
    html.head = [...preloads, ...html.head]
  })
})
