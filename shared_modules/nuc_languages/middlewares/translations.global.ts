import { defineNuxtRouteMiddleware, useNuxtApp } from 'nuxt/app'

import { ensureLocaleTranslations, isSupportedLocale } from 'nucleify'

export default defineNuxtRouteMiddleware(async (to) => {
  const lang = to.params.lang
  if (typeof lang !== 'string' || !isSupportedLocale(lang)) return

  const nuxtApp = useNuxtApp()
  await ensureLocaleTranslations(nuxtApp, lang)
})
