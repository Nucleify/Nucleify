import { defineNuxtPlugin } from 'nuxt/app'
import { resolveThemeMode, setupNui } from 'portable/nui'

/**
 * Admin shell - portable/nui tokens + Lit registration.
 * Visual chrome is Payload-like via admin.scss; nui controls share tokens.
 */
export default defineNuxtPlugin({
  name: 'nucleify-ui',
  enforce: 'pre',
  setup() {
    setupNui({ palette: 'nuxt', mode: resolveThemeMode() })
  },
})
