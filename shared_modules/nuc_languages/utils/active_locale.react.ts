import {
  isSupportedLocale,
  NUC_DEFAULT_LOCALE,
  type SupportedLocale,
} from 'nucleify'

export type LocaleCode = SupportedLocale

const defaultLocale: LocaleCode = NUC_DEFAULT_LOCALE as LocaleCode

let activeLocale: LocaleCode = defaultLocale

export function setActiveLocale(locale: string | undefined): void {
  if (locale && isSupportedLocale(locale)) {
    activeLocale = locale
    return
  }
  activeLocale = defaultLocale
}

export function getActiveLocale(): LocaleCode {
  return activeLocale
}

export function assignActiveLocale(code: LocaleCode): void {
  activeLocale = code
}

export function getDefaultLocale(): LocaleCode {
  return defaultLocale
}
