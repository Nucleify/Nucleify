import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from 'nuxt/app'

import { NUC_DEFAULT_LOCALE, NUC_LOCALES } from '../../modules/nuc_languages'

const validLocaleCodes = NUC_LOCALES.map((locale) => locale.code)

export default defineNuxtRouteMiddleware(async (to) => {
  const lang = to.params.lang as string | undefined
  if (!lang) return

  if (!validLocaleCodes.includes(lang)) {
    return navigateTo(`/${NUC_DEFAULT_LOCALE}/home`, { redirectCode: 302 })
  }

  // biome-ignore lint/suspicious/noExplicitAny: $i18n is provided by @nuxtjs/i18n
  const i18n = useNuxtApp().$i18n as any
  if (!i18n) return

  if (i18n.locale?.value !== lang) {
    await i18n.setLocale(lang)
  }
})
