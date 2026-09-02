import { unwrapApiBody } from './translation_api'

import { resolveApiUrl } from '../../nuc_api/utils/api_request'

export type LocaleDict = Record<string, string>

export const SUPPORTED_LOCALES = ['en', 'pl', 'vn'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export function isSupportedLocale(code: string): code is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(code)
}

export function buildTranslationsUrl(locale: string): string {
  const path = `/translations/locale/${locale}`
  const base = resolveApiUrl(path)
  if (typeof window === 'undefined') return base

  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}t=${Date.now()}`
}

export function normalizeTranslationPayload(raw: unknown): LocaleDict | null {
  const payload = unwrapApiBody<unknown>(raw) ?? raw

  if (Array.isArray(payload)) {
    const out: LocaleDict = {}
    for (const row of payload) {
      if (!row || typeof row !== 'object') continue
      const { key, value } = row as { key?: unknown; value?: unknown }
      if (typeof key === 'string' && value != null) out[key] = String(value)
    }
    return Object.keys(out).length > 0 ? out : null
  }

  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    const out: LocaleDict = {}
    for (const [k, v] of Object.entries(payload as Record<string, unknown>)) {
      if (typeof v === 'string') out[k] = v
    }
    return Object.keys(out).length > 0 ? out : null
  }

  return null
}

async function resolveServerOrigin(): Promise<string | undefined> {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  try {
    const { headers } = await import('next/headers')
    const headerList = await headers()
    const host =
      headerList.get('x-forwarded-host') ?? headerList.get('host') ?? ''
    if (host) {
      const protocol =
        headerList.get('x-forwarded-proto')?.split(',')[0]?.trim() ?? 'http'
      return `${protocol}://${host}`
    }
  } catch {
    // Not Next or outside a request (e.g. Nuxt, tests).
  }

  const envBase =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NUXT_PUBLIC_APP_URL ||
    process.env.APP_URL

  if (envBase) {
    return envBase.replace(/\/$/, '')
  }

  const port = process.env.PORT || process.env.NUXT_PORT || '3000'
  return `http://127.0.0.1:${port}`
}

async function resolveAbsoluteFetchUrl(url: string): Promise<string> {
  if (/^https?:\/\//i.test(url)) return url

  const origin = await resolveServerOrigin()
  if (origin) {
    return `${origin}${url}`
  }

  return url
}

type NuxtFetch = <T>(
  url: string,
  options?: Record<string, unknown>
) => Promise<T>

function getNuxtFetch(): NuxtFetch | undefined {
  return (globalThis as { $fetch?: NuxtFetch }).$fetch
}

async function requestTranslationsJson(url: string): Promise<unknown | null> {
  const isServer = typeof window === 'undefined'
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (!isServer) {
    headers['Cache-Control'] = 'no-cache'
    headers.Pragma = 'no-cache'
  }

  const nuxtFetch = getNuxtFetch()
  if (nuxtFetch) {
    try {
      return await nuxtFetch<unknown>(url, {
        cache: 'no-store',
        credentials: 'include',
        headers,
      })
    } catch {
      return null
    }
  }

  try {
    const response = await fetch(
      await resolveAbsoluteFetchUrl(url),
      isServer
        ? ({
            headers,
            credentials: 'include',
            next: { revalidate: 30 },
          } as RequestInit)
        : ({
            cache: 'no-store',
            headers,
            credentials: 'include',
          } as RequestInit)
    )
    if (!response.ok) return null
    return (await response.json()) as unknown
  } catch {
    return null
  }
}

export async function fetchLocaleMessages(
  locale: string
): Promise<LocaleDict | null> {
  const raw = await requestTranslationsJson(buildTranslationsUrl(locale))
  return normalizeTranslationPayload(raw)
}

export async function requireLocaleMessages(
  locale: SupportedLocale
): Promise<LocaleDict> {
  const messages = await fetchLocaleMessages(locale)
  if (!messages) {
    throw new Error(
      `[nuc_languages] Translations for "${locale}" could not be loaded from API`
    )
  }
  return messages
}
