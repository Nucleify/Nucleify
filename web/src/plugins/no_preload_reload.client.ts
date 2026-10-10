import { defineNuxtPlugin } from 'nuxt/app'

/**
 * Vite fires `vite:preloadError` when a dynamic import / CSS preload fails
 * (common after deploy or on flaky mobile). Nuxt's default chunk-reload plugin
 * turns that into location.reload() in a ~10s loop — block the default throw.
 */
export default defineNuxtPlugin({
  name: 'nuc-no-preload-reload',
  enforce: 'pre',
  setup() {
    if (!import.meta.client) return
    window.addEventListener(
      'vite:preloadError',
      (event) => {
        event.preventDefault()
      },
      true
    )
  },
})
