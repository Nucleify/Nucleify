import { defineNuxtModule } from '@nuxt/kit'
import {
  createOverrideAliases,
  handleAppResolve,
  handleImportsDirs,
  handleNitroConfig,
  handlePagesExtend,
  overridePlugin,
} from './utils'

export default defineNuxtModule({
  meta: {
    name: 'nuc-overrides',
    configKey: 'overrides',
  },
  setup(_options, nuxt) {
    nuxt.hook('vite:extendConfig', (config) => {
      const plugins = config.plugins || []
      plugins.push(overridePlugin())
      // @ts-expect-error - Vite config plugins is read-only but we need to modify it
      config.plugins = plugins

      const resolveConfig = config.resolve || {}
      const alias = resolveConfig.alias || {}

      Object.assign(alias, createOverrideAliases())
      // @ts-expect-error - Vite config resolve is read-only but we need to modify it
      config.resolve = {
        ...resolveConfig,
        alias,
      }
    })

    nuxt.hook('nitro:config', (config) => {
      handleNitroConfig(config)
    })

    // @ts-expect-error - HookResult type but we return string[]
    nuxt.hook('imports:dirs', (dirs) => {
      return handleImportsDirs(dirs)
    })

    nuxt.hook('pages:extend', (pages) => {
      handlePagesExtend(pages)
    })

    nuxt.hook('app:resolve', (app) => {
      handleAppResolve(app)
    })
  },
})
