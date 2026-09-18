import type { LocaleDict, SupportedLocale } from 'nucleify'

import { createInstance, type i18n as I18nInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'

export async function createI18nInstance(
  locale: SupportedLocale,
  messages: LocaleDict
): Promise<I18nInstance> {
  const instance = createInstance()
  instance.use(initReactI18next)
  await instance.init({
    lng: locale,
    fallbackLng: 'en',
    resources: {
      [locale]: { translation: messages },
    },
    interpolation: {
      escapeValue: false,
      prefix: '{',
      suffix: '}',
    },
    react: { useSuspense: false },
  })
  return instance
}
