import { registerGlobalConstants } from 'atomic'

import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  name: 'constants-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerGlobalConstants(nuxtApp.vueApp)
  },
})
