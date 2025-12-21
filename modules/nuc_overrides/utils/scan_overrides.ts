import { scanDirectory } from '.'

import { existsSync } from 'fs'
import { join, resolve } from 'path'

export interface OverrideMappingInterface {
  originalPath: string
  overridePath: string
  relativePath: string
}

export function scanOverrides(): OverrideMappingInterface[] {
  const overridesDir = resolve(process.cwd(), 'overrides')
  const mappings: OverrideMappingInterface[] = []

  if (!existsSync(overridesDir)) {
    return mappings
  }

  const nuxtOverridesDir = join(overridesDir, 'nuxt')
  if (existsSync(nuxtOverridesDir)) {
    scanDirectory(nuxtOverridesDir, 'nuxt', mappings)
  }

  const modulesOverridesDir = join(overridesDir, 'modules')
  if (existsSync(modulesOverridesDir)) {
    scanDirectory(modulesOverridesDir, 'modules', mappings)
  }

  return mappings
}
