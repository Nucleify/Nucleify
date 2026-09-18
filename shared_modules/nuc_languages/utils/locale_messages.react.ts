import {
  assignActiveLocale,
  getActiveLocale,
  getDefaultLocale,
  isSupportedLocale,
  type LocaleCode,
  type LocaleDict,
  requireLocaleMessages,
  SUPPORTED_LOCALES,
} from 'nucleify'

const defaultLocale = getDefaultLocale()

const locales = Object.fromEntries(
  SUPPORTED_LOCALES.map((code) => [code, {} as LocaleDict])
) as Record<LocaleCode, LocaleDict>

export async function preloadLocaleMessages(
  locale: string | undefined
): Promise<LocaleDict> {
  const code = locale && isSupportedLocale(locale) ? locale : defaultLocale
  const messages = await requireLocaleMessages(code)
  locales[code] = messages
  assignActiveLocale(code)
  return messages
}

export function hydrateLocaleMessages(
  locale: LocaleCode,
  messages: LocaleDict
): void {
  locales[locale] = messages
  assignActiveLocale(locale)
}

export const enLocale = new Proxy({} as LocaleDict, {
  get(_target, prop) {
    if (typeof prop !== 'string') return undefined

    const active = locales[getActiveLocale()]
    const fallback = locales[defaultLocale]

    return active[prop] ?? fallback[prop] ?? prop
  },
}) as LocaleDict

type TranslationParams = Record<string, string | number | undefined>

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template

  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name]
    return value != null ? String(value) : match
  })
}

export function t(key: string, params?: TranslationParams): string {
  const active = locales[getActiveLocale()]
  const fallback = locales[defaultLocale]
  const template = active[key] ?? fallback[key] ?? key
  return interpolate(template, params)
}

export async function refreshTranslationMessages(): Promise<void> {
  if (typeof window === 'undefined') return

  const locale = getActiveLocale()
  try {
    locales[locale] = await requireLocaleMessages(locale)
  } catch {
    /* network error */
  }
}

export const plLocale = locales.pl
export const vnLocale = locales.vn
