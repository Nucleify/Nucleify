import type { OverrideMappingInterface } from '.'

import { readdirSync, statSync } from 'fs'
import { join, relative, resolve } from 'path'

export function scanDirectory(
  dir: string,
  baseDir: 'nuxt' | 'modules',
  mappings: OverrideMappingInterface[]
): void {
  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      scanDirectory(fullPath, baseDir, mappings)
    } else if (stat.isFile()) {
      const relativePath = relative(
        join(process.cwd(), 'overrides', baseDir),
        fullPath
      )

      const originalPath = resolve(process.cwd(), baseDir, relativePath)

      mappings.push({
        originalPath,
        overridePath: fullPath,
        relativePath,
      })
    }
  }
}
