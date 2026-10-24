import { defineNuxtPlugin } from 'nuxt/app'
import { resolveThemeMode, setupNui } from 'portable/nui'

/**
 * Admin shell - portable/nui tokens + Lit registration.
 * Visual chrome via admin.scss (charcoal, radius 0); nui controls share tokens.
 */
export default defineNuxtPlugin({
  name: 'nucleify-ui',
  enforce: 'pre',
  setup() {
    setupNui({ palette: 'nuxt', mode: resolveThemeMode() })
  },
})
