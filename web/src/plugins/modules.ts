import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

import {
  registerNucCms,
  registerNucColors,
  registerNucDarkMode,
  registerNucGlobals,
  registerNucLanguages,
} from '@shared_modules'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    const config = useRuntimeConfig()
    const assetPrefix =
      String(config.public.appEnv || '') === 'production'
        ? ''
        : String(config.public.appUrl || '')

    registerNucGlobals(nuxtApp.vueApp, { assetPrefix })
    registerNucColors(nuxtApp.vueApp)
    registerNucDarkMode(nuxtApp.vueApp)
    registerNucLanguages(nuxtApp)
    registerNucCms(nuxtApp.vueApp)
  },
})
