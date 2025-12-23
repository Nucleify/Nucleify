import { scanOverrides } from '.'

import { resolve } from 'path'

export function createTypeScriptPaths(): Record<string, string[]> {
  const mappings = scanOverrides()
  const paths: Record<string, string[]> = {}

  for (const mapping of mappings) {
    const relativePath = mapping.relativePath.replace(/\\/g, '/')

    const pathWithoutExt = relativePath.replace(/\.(ts|tsx|vue|js|jsx)$/, '')

    if (mapping.originalPath.startsWith(resolve(process.cwd(), 'nuxt'))) {
      const tsPath = `overrides/nuxt/${pathWithoutExt}`

      paths[`~/${pathWithoutExt}`] = [tsPath]
      paths[`nuxt/${pathWithoutExt}`] = [tsPath]
    }

    if (mapping.originalPath.startsWith(resolve(process.cwd(), 'modules'))) {
      const tsPath = `overrides/modules/${pathWithoutExt}`

      paths[`modules/${pathWithoutExt}`] = [tsPath]
    }
  }

  return paths
}
