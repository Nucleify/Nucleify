/**
 * Placeholder spliced with a JSON string array on `nitro:compiled` (see hooks.ts).
 */
export const FONT_PRELOAD_RAW = '__NUC_FONT_PRELOADS_JSON__'
export const MAX_PRELOADED_FONTS = 4

/** Nuxt HTML renderer payload provided to Nitro at runtime. */
export interface HtmlRenderContext {
  head: string[]
}

export function parseFontPreloadTags(
  rawJson: string = FONT_PRELOAD_RAW
): string[] {
  if (rawJson.startsWith('__NUC_')) {
    return []
  }

  try {
    const parsed = JSON.parse(rawJson)
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter((href): href is string => typeof href === 'string')
      .slice(0, MAX_PRELOADED_FONTS)
      .map(
        (href) =>
          `<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`
      )
  } catch {
    return []
  }
}

// Precompute once at startup to avoid re-generating tags on every request.
export const PRELOAD_TAGS = parseFontPreloadTags()

export function injectFontPreloads(html: HtmlRenderContext): void {
  html.head.unshift(...PRELOAD_TAGS)
}
