/** Public Astro docs host (separate from the marketing app on nucleify.io). */
export const NUC_DOCS_ORIGIN = 'https://docs.nucleify.io'

/** Absolute docs page URL, e.g. `https://docs.nucleify.io/en/docs/…`. */
export function docsPageHref(lang: string, pathWithinDocs: string): string {
  const path = pathWithinDocs.replace(/^\/+/, '')
  return `${NUC_DOCS_ORIGIN}/${lang}/docs/${path}`
}
