import { OverrideMappingInterface, scanOverrides } from '.'

import { normalize, resolve } from 'path'
import type { Plugin } from 'vite'

export function overridePlugin(): Plugin {
  let overrideMappings: OverrideMappingInterface[] = []

  return {
    name: 'nuxt-override-resolver',
    configResolved() {
      overrideMappings = scanOverrides()
    },
    resolveId(id, importer) {
      if (overrideMappings.length === 0) {
        return null
      }

      if (id.endsWith('app.vue') || id.includes('/app.vue')) {
        const appVuePath = resolve(process.cwd(), 'nuxt', 'app.vue')
        const normalizedAppVue = normalize(appVuePath)

        for (const mapping of overrideMappings) {
          const normalizedOriginal = normalize(mapping.originalPath)
          if (normalizedOriginal === normalizedAppVue) {
            return mapping.overridePath
          }
        }
      }

      let resolvedId: string | null = null

      if (id.startsWith('~/')) {
        resolvedId = resolve(process.cwd(), 'nuxt', id.slice(2))
      } else if (id.startsWith('modules/')) {
        resolvedId = resolve(process.cwd(), id)
      } else if (importer && (id.startsWith('./') || id.startsWith('../'))) {
        const importerDir = resolve(importer, '.')
        resolvedId = resolve(importerDir, id)
      } else if (!id.startsWith('.') && !id.includes(':')) {
        try {
          resolvedId = resolve(process.cwd(), id)
        } catch {
          // Ignore if can't resolve
        }
      }

      if (!resolvedId) {
        return null
      }

      const normalizedResolved = normalize(resolvedId)

      for (const mapping of overrideMappings) {
        const normalizedOriginal = normalize(mapping.originalPath)
        if (normalizedResolved === normalizedOriginal) {
          return mapping.overridePath
        }
      }

      return null
    },
    buildStart() {
      // Exclude original files from build by marking them as external
      // This is handled by the rollup options in nuxt.config.ts
    },
  }
}
