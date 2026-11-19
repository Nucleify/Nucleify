import { defineNuxtPlugin } from 'nuxt/app'

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
