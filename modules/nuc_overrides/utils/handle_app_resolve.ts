import { scanOverrides } from '.'

import { normalize, resolve } from 'path'

// biome-ignore lint/suspicious/noExplicitAny: Nuxt app type
export function handleAppResolve(app: any): void {
  const mappings = scanOverrides()
  const appVuePath = normalize(resolve(process.cwd(), 'nuxt', 'app.vue'))

  for (const mapping of mappings) {
    const normalizedOriginal = normalize(mapping.originalPath)
    if (normalizedOriginal === appVuePath) {
      if (app.rootComponent) {
        app.rootComponent = normalize(mapping.overridePath)
      }
      break
    }
  }
}
