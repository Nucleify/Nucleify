import { describe, expect, it } from 'vitest'

import fs from 'fs'
import path from 'path'

const pluginsDir = path.resolve(__dirname, '../../nuxt/plugins')

const pluginFiles = fs
  .readdirSync(pluginsDir)
  .filter((file) => file.endsWith('.ts'))

describe('Nuxt plugins', (): void => {
  for (const file of pluginFiles) {
    it(`${file} exports the correct structure`, async (): Promise<void> => {
      const pluginModule = await import(path.join(pluginsDir, file))
      const plugin = pluginModule.default

      if (plugin && typeof plugin === 'object' && 'setup' in plugin) {
        expect(plugin).toHaveProperty('setup')
        expect(typeof plugin.setup).toBe('function')
      } else {
        expect(typeof plugin).toBe('function')
      }
    })
  }
})
