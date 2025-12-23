import { scanOverrides } from '.'

import { normalize, resolve } from 'path'

// biome-ignore lint/suspicious/noExplicitAny: Nuxt pages type
export function handlePagesExtend(pages: any[]): void {
  const mappings = scanOverrides()
  const pagesDir = normalize(resolve(process.cwd(), 'nuxt', 'pages'))

  const pagesOverrides = new Map<string, string>()
  mappings.forEach((mapping) => {
    const normalizedOriginal = normalize(mapping.originalPath)
    if (normalizedOriginal.startsWith(pagesDir)) {
      pagesOverrides.set(normalizedOriginal, normalize(mapping.overridePath))
    }
  })

  pages.forEach((page) => {
    if (page.file) {
      const normalizedPageFile = normalize(page.file)
      const overridePath = pagesOverrides.get(normalizedPageFile)

      if (overridePath) {
        page.file = overridePath
      }
    }
  })
}
