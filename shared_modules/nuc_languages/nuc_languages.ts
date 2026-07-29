import type { NuxtApp } from 'nuxt/app'
import { useNuxtApp, useState } from 'nuxt/app'

import {
  fetchLocaleMessages,
  isSupportedLocale,
  requireLocaleMessages,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from './utils/fetch_locale_messages'

const STATE_KEY = '_translations'

type TranslationMessages = Record<string, Record<string, string>>

function resolveActiveLocale(
  nuxtApp: NuxtApp,
  i18n: { locale: { value: string } }
): SupportedLocale {
  const fromRoute = nuxtApp._route?.params?.lang as string | undefined
  if (fromRoute && isSupportedLocale(fromRoute)) {
    return fromRoute
  }
  const current = i18n.locale?.value
  if (current && isSupportedLocale(current)) {
    return current
  }
  return 'en'
}

function getI18nTarget(nuxtI18n: unknown): unknown {
  if (nuxtI18n == null || typeof nuxtI18n !== 'object') return nuxtI18n
  const g = (nuxtI18n as { global?: unknown }).global
  if (
    g != null &&
    typeof g === 'object' &&
    typeof (g as { getLocaleMessage?: unknown }).getLocaleMessage === 'function'
  ) {
    return g
  }
  return nuxtI18n
}

type I18nMessageTarget = {
  setLocaleMessage: (locale: string, msg: Record<string, string>) => void
}

function asI18nMessageTarget(nuxtI18n: unknown): I18nMessageTarget | null {
  const i18n = getI18nTarget(nuxtI18n)
  if (
    !i18n ||
    typeof i18n !== 'object' ||
    typeof (i18n as I18nMessageTarget).setLocaleMessage !== 'function'
  ) {
    return null
  }
  return i18n as I18nMessageTarget
}

function applyDbMessagesToI18n(
  nuxtI18n: unknown,
  allMessages: TranslationMessages
): void {
  const i18n = asI18nMessageTarget(nuxtI18n)
  if (!i18n) return
  for (const locale of ['en', 'pl', 'vn'] as const) {
    const msgs = allMessages[locale]
    if (!msgs || Object.keys(msgs).length === 0) continue
    i18n.setLocaleMessage(locale, msgs)
  }
}

function getTranslationState(
  nuxtApp: NuxtApp
): ReturnType<typeof useState<TranslationMessages>> {
  return useState<TranslationMessages>(STATE_KEY, () => ({}))
}

function hasCachedLocale(
  translationState: ReturnType<typeof getTranslationState>,
  locale: SupportedLocale
): boolean {
  const cached = translationState.value[locale]
  return Boolean(cached && Object.keys(cached).length > 0)
}

function cacheLocaleMessages(
  translationState: ReturnType<typeof getTranslationState>,
  locale: SupportedLocale,
  messages: Record<string, string>
): void {
  translationState.value = {
    ...translationState.value,
    [locale]: messages,
  }
}

async function fetchAndCacheLocale(
  nuxtApp: NuxtApp,
  locale: SupportedLocale
): Promise<boolean> {
  const translationState = getTranslationState(nuxtApp)
  if (hasCachedLocale(translationState, locale)) {
    applyDbMessagesToI18n(nuxtApp.$i18n, {
      [locale]: translationState.value[locale],
    })
    return true
  }

  const messages = await fetchLocaleMessages(locale)
  if (!messages) return false

  cacheLocaleMessages(translationState, locale, messages)
  applyDbMessagesToI18n(nuxtApp.$i18n, { [locale]: messages })
  return true
}

export function prefetchAllLocaleTranslations(nuxtApp: NuxtApp): void {
  if (import.meta.server) return

  const i18n = nuxtApp.$i18n as { locale: { value: string } } | undefined
  if (!i18n) return

  getTranslationState(nuxtApp)
  const activeLocale = resolveActiveLocale(nuxtApp, i18n)
  const pending = SUPPORTED_LOCALES.filter((locale) => locale !== activeLocale)

  void Promise.all(
    pending.map((locale) => fetchAndCacheLocale(nuxtApp, locale))
  )
}

export async function ensureLocaleTranslations(
  nuxtApp: NuxtApp,
  locale: SupportedLocale
): Promise<void> {
  const i18n = nuxtApp.$i18n as { locale: { value: string } } | undefined
  if (!i18n) return

  const translationState = getTranslationState(nuxtApp)

  if (hasCachedLocale(translationState, locale)) {
    applyDbMessagesToI18n(nuxtApp.$i18n, {
      [locale]: translationState.value[locale],
    })
    i18n.locale.value = locale
    return
  }

  const messages = await requireLocaleMessages(locale)
  cacheLocaleMessages(translationState, locale, messages)
  applyDbMessagesToI18n(nuxtApp.$i18n, { [locale]: messages })
  i18n.locale.value = locale
}

export async function preloadTranslations(nuxtApp: NuxtApp): Promise<void> {
  const i18n = nuxtApp.$i18n as { locale: { value: string } } | undefined
  if (!i18n) return

  useState<TranslationMessages>(STATE_KEY, () => ({}))

  const lang = nuxtApp._route?.params?.lang as string | undefined
  if (lang && isSupportedLocale(lang)) {
    i18n.locale.value = lang
  }

  const activeLocale = resolveActiveLocale(nuxtApp, i18n)
  await ensureLocaleTranslations(nuxtApp, activeLocale)
  prefetchAllLocaleTranslations(nuxtApp)
}

export async function refreshTranslationMessages(): Promise<void> {
  if (import.meta.server) return
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$i18n) return
  // biome-ignore lint/suspicious/noExplicitAny: $i18n from @nuxtjs/i18n
  const i18n = nuxtApp.$i18n as any
  const locale = resolveActiveLocale(nuxtApp, i18n)

  try {
    const messages = await requireLocaleMessages(locale)
    const fresh: TranslationMessages = { [locale]: messages }
    applyDbMessagesToI18n(nuxtApp.$i18n, fresh)
    const translationState = useState<TranslationMessages>(
      STATE_KEY,
      () => ({})
    )
    translationState.value = {
      ...translationState.value,
      ...fresh,
    }
  } catch (_err) {
    /* network error */
  }
}

/** UI wiped — re-register components after rewrite. */
export function registerNucLanguages(nuxtApp: NuxtApp): void {
  // @ts-expect-error — hook z @nuxtjs/i18n
  nuxtApp.hook('i18n:localeSwitched', (payload: unknown) => {
    if (import.meta.server) return
    const newLocale =
      payload &&
      typeof payload === 'object' &&
      'newLocale' in payload &&
      typeof (payload as { newLocale?: unknown }).newLocale === 'string'
        ? (payload as { newLocale: string }).newLocale
        : ''
    if (!isSupportedLocale(newLocale)) return
    void ensureLocaleTranslations(nuxtApp, newLocale)
  })
}
