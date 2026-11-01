/**
 * Same families/weights as web/.config/nuxt/fonts-icon.ts.
 * Load via <link> in document head - never CSS @import inside a bundle.
 */
export const NUC_GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600&family=JetBrains+Mono:wght@600;700&display=swap'

/** Plain HTML for Vite/Astro index heads. */
export const NUC_GOOGLE_FONTS_LINK_HTML = [
  '<link rel="preconnect" href="https://fonts.googleapis.com" />',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
  `<link rel="stylesheet" href="${NUC_GOOGLE_FONTS_HREF}" />`,
].join('\n    ')

/** Idempotent client inject when the host did not put <link> in HTML. */
export function ensureGoogleFontsLinked(doc: Document = document): void {
  if (doc.querySelector(`link[rel="stylesheet"][href="${NUC_GOOGLE_FONTS_HREF}"]`)) {
    return
  }

  const head = doc.head
  if (!head) return

  if (!doc.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {
    const preGoogle = doc.createElement('link')
    preGoogle.rel = 'preconnect'
    preGoogle.href = 'https://fonts.googleapis.com'
    head.appendChild(preGoogle)
  }

  if (!doc.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]')) {
    const preGstatic = doc.createElement('link')
    preGstatic.rel = 'preconnect'
    preGstatic.href = 'https://fonts.gstatic.com'
    preGstatic.crossOrigin = 'anonymous'
    head.appendChild(preGstatic)
  }

  const sheet = doc.createElement('link')
  sheet.rel = 'stylesheet'
  sheet.href = NUC_GOOGLE_FONTS_HREF
  head.appendChild(sheet)
}
