'use client'

import { useEffect } from 'react'

import { colorsClientPlugin } from 'nucleify'

import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    colorsClientPlugin()
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
