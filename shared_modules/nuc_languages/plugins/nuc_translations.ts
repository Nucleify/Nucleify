import { addRouteMiddleware, defineNuxtPlugin } from 'nuxt/app'

import { preloadTranslations } from 'nucleify'

import translationsGlobalMiddleware from '../middlewares/translations.global'

export default defineNuxtPlugin({
  name: 'nuc_translations',
  dependsOn: ['i18n:plugin'],
  parallel: false,
  async setup(nuxtApp) {
    addRouteMiddleware('translations', translationsGlobalMiddleware, {
      global: true,
    })
    await preloadTranslations(nuxtApp)
  },
})
