import { defineNuxtRouteMiddleware, useNuxtApp } from 'nuxt/app'

import { ensureLocaleTranslations } from '../nuc_languages'

import { isSupportedLocale } from '../utils/fetch_locale_messages'

export default defineNuxtRouteMiddleware(async (to) => {
  const lang = to.params.lang
  if (typeof lang !== 'string' || !isSupportedLocale(lang)) return

  const nuxtApp = useNuxtApp()
  await ensureLocaleTranslations(nuxtApp, lang)
})
