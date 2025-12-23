import { scanOverrides } from '.'

import { readFileSync } from 'fs'
import { normalize } from 'path'
import type { Plugin } from 'vite'

export function overridePlugin(): Plugin {
  let overrideMap: Map<string, string> = new Map()

  return {
    name: 'nuxt-override-resolver',
    enforce: 'pre',
    configResolved() {
      overrideMap = new Map(
        scanOverrides().map((m) => [normalize(m.originalPath), m.overridePath])
      )
    },
    load(id) {
      if (id.includes('/overrides/')) return null

      const override = overrideMap.get(normalize(id.split('?')[0]))
      return override ? readFileSync(override, 'utf-8') : null
    },
  }
}
