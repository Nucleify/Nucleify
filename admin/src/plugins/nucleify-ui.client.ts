import { defineNuxtPlugin } from 'nuxt/app'
import { resolveThemeMode, setupNui } from 'portable/nui'

/**
 * Admin shell — same portable/nui tokens + Lit registration as web.
 * Palette stays Nuxt-green until an admin Next host exists.
 */
export default defineNuxtPlugin({
  name: 'nucleify-ui',
  enforce: 'pre',
  setup() {
    setupNui({ palette: 'nuxt', mode: resolveThemeMode() })
  },
})
