import { existsSync, readdirSync, statSync } from 'fs'
import { join, normalize, relative, resolve } from 'path'

export interface OverrideMappingInterface {
  originalPath: string
  overridePath: string
  relativePath: string
}

function scanDirectory(
  dir: string,
  baseDir: 'nuxt' | 'modules',
  mappings: OverrideMappingInterface[]
): void {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)

    if (statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath, baseDir, mappings)
    } else {
      const relativePath = relative(
        join(process.cwd(), 'overrides', baseDir),
        fullPath
      )
      mappings.push({
        originalPath: normalize(resolve(process.cwd(), baseDir, relativePath)),
        overridePath: normalize(fullPath),
        relativePath,
      })
    }
  }
}

export function scanOverrides(): OverrideMappingInterface[] {
  const overridesDir = resolve(process.cwd(), 'overrides')
  const mappings: OverrideMappingInterface[] = []

  if (!existsSync(overridesDir)) {
    return mappings
  }

  for (const baseDir of ['nuxt', 'modules'] as const) {
    const dir = join(overridesDir, baseDir)
    if (existsSync(dir)) {
      scanDirectory(dir, baseDir, mappings)
    }
  }

  return mappings
}
