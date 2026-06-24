import { LangLayoutClient } from './layout.client'

import {
  isSupportedLocale,
  requireLocaleMessages,
  type SupportedLocale,
} from '../../../modules/nuc_languages/atomic/bosons/utils/fetch_locale_messages'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang: SupportedLocale = isSupportedLocale(rawLang) ? rawLang : 'en'
  const messages = await requireLocaleMessages(lang)

  return (
    <LangLayoutClient lang={lang} messages={messages}>
      {children}
    </LangLayoutClient>
  )
}
