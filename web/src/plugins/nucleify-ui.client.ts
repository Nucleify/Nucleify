import { defineNuxtPlugin } from 'nuxt/app'

import { applyTheme, type ThemeMode } from 'nucleify-ui/theme'

import 'nucleify-ui/styles/variables.css'
import 'nucleify-ui/styles/global.css'

/** Lit custom elements — client-only (HTMLElement is unavailable in CF Workers). */
import 'nucleify-ui/components/nui-button'
import 'nucleify-ui/components/nui-dialog'
import 'nucleify-ui/components/nui-icon'
import 'nucleify-ui/components/nui-input-text'
import 'nucleify-ui/components/nui-select'
import 'nucleify-ui/components/nui-toast'

function resolveThemeMode(): ThemeMode {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('p-dark')
    ? 'dark'
    : 'light'
}

export default defineNuxtPlugin({
  name: 'nucleify-ui',
  enforce: 'pre',
  setup() {
    applyTheme('nuxt', resolveThemeMode())

    if (typeof MutationObserver === 'undefined') return
    const observer = new MutationObserver(() => {
      applyTheme('nuxt', resolveThemeMode())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  },
})
