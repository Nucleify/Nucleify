'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../modules/nuc_languages/locales/en.json'

i18n.use(initReactI18next)

void i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en as Record<string, string>,
    },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

export default i18n
