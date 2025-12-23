import { scanOverrides } from '.'

import { resolve } from 'path'

export function createOverrideAliases(): Record<string, string> {
  const mappings = scanOverrides()
  const aliases: Record<string, string> = {}

  for (const mapping of mappings) {
    aliases[mapping.originalPath] = mapping.overridePath

    const relativeImport = mapping.relativePath.replace(/\\/g, '/')

    if (mapping.originalPath.startsWith(resolve(process.cwd(), 'nuxt'))) {
      aliases[`~/${relativeImport}`] = mapping.overridePath
      aliases[`nuxt/${relativeImport}`] = mapping.overridePath
    }
    if (mapping.originalPath.startsWith(resolve(process.cwd(), 'modules'))) {
      aliases[`modules/${relativeImport}`] = mapping.overridePath
    }
  }

  return aliases
}
