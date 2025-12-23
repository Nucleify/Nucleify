import { handleOverrideChange, scanOverrides } from '.'

import { readFileSync } from 'fs'
import { normalize, resolve } from 'path'
import type { Plugin } from 'vite'

export function overridePlugin(): Plugin {
  let overrideMap: Map<string, string> = new Map()
  const overridesDir = resolve(process.cwd(), 'overrides')

  function refresh() {
    overrideMap = new Map(
      scanOverrides().map((m) => [normalize(m.originalPath), m.overridePath])
    )
  }

  return {
    name: 'nuxt-override-resolver',
    enforce: 'pre',
    configResolved() {
      refresh()
    },
    configureServer(server) {
      server.watcher.add(overridesDir)
      const handleChange = handleOverrideChange(
        server,
        overridesDir,
        overrideMap,
        refresh
      )
      ;['change', 'add', 'unlink'].forEach((e) =>
        server.watcher.on(e, handleChange)
      )
    },
    load(id) {
      if (id.includes('/overrides/')) return null
      const override = overrideMap.get(normalize(id.split('?')[0]))
      return override ? readFileSync(override, 'utf-8') : null
    },
  }
}
