import { defineNuxtPlugin } from 'nuxt/app'
import { applyTheme, type ThemeMode } from 'nucleify-ui/theme'

import 'nucleify-ui/styles/variables.css'
import 'nucleify-ui/styles/global.css'
import 'nucleify-ui/components/nui-button'
import 'nucleify-ui/components/nui-icon'

function resolveThemeMode(): ThemeMode {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('p-dark') ? 'dark' : 'light'
}

export default defineNuxtPlugin({
  name: 'nucleify-ui',
  enforce: 'pre',
  setup() {
    applyTheme('nuxt', resolveThemeMode())
  },
})