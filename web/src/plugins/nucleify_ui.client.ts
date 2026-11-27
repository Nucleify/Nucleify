import { defineNuxtPlugin } from 'nuxt/app'

import { resolveThemeMode, setupNui } from '@portable'

export default defineNuxtPlugin({
  name: 'nucleify_ui',
  enforce: 'pre',
  async setup() {
    await setupNui({
      palette: 'nuxt',
      mode: resolveThemeMode(),
      loadFonts: false,
    })
  },
})
