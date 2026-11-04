// @ts-nocheck
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

import {
  registerNucColors,
  registerNucDarkMode,
  registerNucGlobals,
  registerNucLanguages,
} from '@shared_modules'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerNucGlobals(nuxtApp.vueApp)
    registerNucColors(nuxtApp.vueApp)
    registerNucDarkMode(nuxtApp.vueApp)
    registerNucLanguages(nuxtApp)
  },
})
