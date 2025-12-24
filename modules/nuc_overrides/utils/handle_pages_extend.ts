import { scanOverrides } from '.'

import { normalize, resolve } from 'path'

// biome-ignore lint/suspicious/noExplicitAny: Nuxt pages type
export function handlePagesExtend(pages: any[]): void {
  const pagesDir = normalize(resolve(process.cwd(), 'nuxt', 'pages'))
  const overrides = new Map(
    scanOverrides()
      .filter((m) => normalize(m.originalPath).startsWith(pagesDir))
      .map((m) => [normalize(m.originalPath), m.overridePath])
  )

  for (const page of pages) {
    const override = overrides.get(normalize(page.file))
    if (override) page.file = override
  }
}
