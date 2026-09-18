import { defineNuxtPlugin } from 'nuxt/app'
import { resolveThemeMode, setupNui } from '../../../portable/nui'

export default defineNuxtPlugin({
  name: 'nucleify-ui',
  enforce: 'pre',
  setup() {
    setupNui({ palette: 'nuxt', mode: resolveThemeMode() })
  },
})
