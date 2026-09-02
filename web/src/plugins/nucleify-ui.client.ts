import { defineNuxtPlugin } from 'nuxt/app'

import { resolveThemeMode, setupNui } from 'portable/nui'

/** Lit custom elements — client-only (HTMLElement is unavailable in CF Workers). */
export default defineNuxtPlugin({
  name: 'nucleify-ui',
  enforce: 'pre',
  setup() {
    setupNui({ palette: 'nuxt', mode: resolveThemeMode() })
  },
})
