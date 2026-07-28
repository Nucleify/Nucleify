import { defineNuxtPlugin } from 'nuxt/app'

import { applyTheme, type ThemeMode } from 'nucleify-ui/theme'

import 'nucleify-ui/styles/variables.css'
import 'nucleify-ui/styles/global.css'

/** Lit custom elements — client-only (HTMLElement is unavailable in CF Workers). */
import '../../modules/nuc_pagebuilder/utils/register_nui_components'

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
