import path from 'path'
import { describe, expect, it } from 'vitest'

const pluginFiles = [
  '../../src/plugins/modules.ts',
  '../../../shared_modules/nuc_colors/plugins/colors.server.ts',
  '../../../shared_modules/nuc_languages/plugins/nuc_translations.ts',
].map((relativePath) => path.resolve(__dirname, relativePath))

describe('Nuxt plugins', (): void => {
  for (const pluginPath of pluginFiles) {
    const file = path.basename(pluginPath)
    it(`${file} exports the correct structure`, async (): Promise<void> => {
      const pluginModule = await import(pluginPath)
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
