import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin({
  name: 'pinia-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    nuxtApp.vueApp.use(pinia)
  },
})
