'use client'

import type { i18n as I18nInstance } from 'i18next'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'

import {
  createI18nInstance,
  hydrateLocaleMessages,
  type LocaleCode,
  NucDock,
  NucSectionFooter,
  NucSectionNavbar,
  setActiveLocale,
  useOfficeType,
} from 'nucleify'

export function LangLayoutClient({
  children,
  lang,
  messages,
}: {
  children: React.ReactNode
  lang: LocaleCode
  messages: Record<string, string>
}) {
  const [i18n, setI18n] = useState<I18nInstance | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const pathname = usePathname()
  const { officeType } = useOfficeType()
  const pathnameLang = pathname.split('/').filter(Boolean).at(0) || lang
  const pageId = pathname.split('/').filter(Boolean).at(1) || 'page'

  useEffect(() => {
    hydrateLocaleMessages(lang, messages)
    setActiveLocale(lang)
    void createI18nInstance(lang, messages).then(setI18n)
  }, [lang, messages])

  useEffect(() => {
    setActiveLocale(pathnameLang)
    setIsHydrated(true)
  }, [pathnameLang])

  const shellId =
    !isHydrated || officeType === 'default'
      ? 'default'
      : officeType === 'back-office'
        ? 'back-office'
        : 'front-office'

  const showFrontOfficeChrome = isHydrated && officeType === 'front-office'
  const showBackOfficeDock = isHydrated && officeType === 'back-office'

  if (!i18n) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      <div id={shellId}>
        <div className="layout-navbar">
          {showFrontOfficeChrome ? <NucSectionNavbar /> : null}
        </div>
        <main id={pageId}>{children}</main>
        <div className="layout-footer">
          {showFrontOfficeChrome ? <NucSectionFooter /> : null}
        </div>
        {showBackOfficeDock ? <NucDock /> : null}
      </div>
    </I18nextProvider>
  )
}
