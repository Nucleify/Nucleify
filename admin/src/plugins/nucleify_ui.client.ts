import { defineNuxtPlugin } from 'nuxt/app'
import { resolveThemeMode, setupNui } from '@portable'

export default defineNuxtPlugin({
  name: 'nucleify_ui',
  enforce: 'pre',
  async setup() {
    try {
      await setupNui({ palette: 'nuxt', mode: resolveThemeMode() })
      if (document.fonts?.ready) {
        await Promise.race([
          document.fonts.ready.catch(() => undefined),
          new Promise<void>((resolve) => setTimeout(resolve, 1500)),
        ])
      }
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
    } finally {
      document.documentElement.setAttribute('data-nui-ready', '')
    }
  },
})