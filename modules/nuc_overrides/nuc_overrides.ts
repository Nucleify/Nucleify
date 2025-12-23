import { defineNuxtModule } from '@nuxt/kit'
import {
  createOverrideAliases,
  handleAppResolve,
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
      // @ts-expect-error - Vite config is read-only
      config.plugins = [...(config.plugins || []), overridePlugin()]
      // @ts-expect-error - Vite config is read-only
      config.resolve = {
        ...config.resolve,
        alias: { ...config.resolve?.alias, ...createOverrideAliases() },
      }
    })

    nuxt.hook('nitro:config', handleNitroConfig)
    nuxt.hook('pages:extend', handlePagesExtend)
    nuxt.hook('app:resolve', handleAppResolve)
  },
})
