import en from './locales/en.json'
import pl from './locales/pl.json'
import vn from './locales/vn.json'

type LocaleDict = Record<string, string>
type LocaleCode = 'en' | 'pl' | 'vn'

const defaultLocale: LocaleCode = 'en'

const locales: Record<LocaleCode, LocaleDict> = {
  en: en as LocaleDict,
  pl: pl as LocaleDict,
  vn: vn as LocaleDict,
}

let activeLocale: LocaleCode = defaultLocale

export function setActiveLocale(locale: string | undefined): void {
  if (locale === 'pl' || locale === 'vn' || locale === 'en') {
    activeLocale = locale
    return
  }

  activeLocale = defaultLocale
}

export function getActiveLocale(): LocaleCode {
  return activeLocale
}

export const enLocale = new Proxy({} as LocaleDict, {
  get(_target, prop) {
    if (typeof prop !== 'string') return undefined

    const active = locales[activeLocale]
    const fallback = locales[defaultLocale]

    return active[prop] ?? fallback[prop] ?? prop
  },
}) as LocaleDict

export function t(key: string): string {
  const active = locales[activeLocale]
  const fallback = locales[defaultLocale]
  return active[key] ?? fallback[key] ?? key
}

export const plLocale = locales.pl
export const vnLocale = locales.vn

export { NUC_LOCALES, type NucLocaleOption } from './constants'

