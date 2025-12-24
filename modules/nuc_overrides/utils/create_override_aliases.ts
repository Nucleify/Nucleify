import { scanOverrides } from '.'

import { resolve } from 'path'

export function createOverrideAliases(): Record<string, string> {
  const nuxtDir = resolve(process.cwd(), 'nuxt')
  const modulesDir = resolve(process.cwd(), 'modules')
  const aliases: Record<string, string> = {}

  for (const m of scanOverrides()) {
    const rel = m.relativePath.replace(/\\/g, '/')
    aliases[m.originalPath] = m.overridePath
    if (m.originalPath.startsWith(nuxtDir)) {
      aliases[`~/${rel}`] = m.overridePath
      aliases[`nuxt/${rel}`] = m.overridePath
    }
    if (m.originalPath.startsWith(modulesDir)) {
      aliases[`modules/${rel}`] = m.overridePath
    }
  }
  return aliases
}
