import {
  createBrowserClient,
  createServerClient,
  type CookieOptions,
} from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { getCookie, parseCookies, setCookie } from 'h3'

type PublicSupabase = { supabaseUrl: string; supabaseKey: string }

function publicConfig(): PublicSupabase {
  const config = useRuntimeConfig()
  const supabaseUrl = String(config.public.supabaseUrl || '')
  const supabaseKey = String(config.public.supabaseKey || '')
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing NUXT_PUBLIC_SUPABASE_URL / NUXT_PUBLIC_SUPABASE_KEY')
  }
  return { supabaseUrl, supabaseKey }
}

/** Cookie-backed browser client — session survives SSR + hard refresh. */
export function createAdminBrowserClient(): SupabaseClient {
  const { supabaseUrl, supabaseKey } = publicConfig()
  return createBrowserClient(supabaseUrl, supabaseKey)
}

/** Cookie-backed server client for Nuxt middleware / SSR. */
export function createAdminServerClient(event: H3Event): SupabaseClient {
  const { supabaseUrl, supabaseKey } = publicConfig()
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        const all = parseCookies(event)
        return Object.entries(all).map(([name, value]) => ({ name, value }))
      },
      setAll(
        cookiesToSet: {
          name: string
          value: string
          options: CookieOptions
        }[]
      ) {
        for (const { name, value, options } of cookiesToSet) {
          setCookie(event, name, value, {
            path: '/',
            sameSite: 'lax',
            ...options,
          })
        }
      },
    },
  })
}

/** True when any Supabase auth cookie is present (cheap gate before getSession). */
export function hasSupabaseAuthCookie(event: H3Event): boolean {
  const all = parseCookies(event)
  return Object.keys(all).some(
    (name) => name.startsWith('sb-') && name.includes('auth-token')
  )
}

/**
 * One-shot migrate legacy localStorage sessions into cookie storage so existing
 * admins are not forced to re-login after the cookie cutover.
 */
export async function migrateLegacyLocalStorageSession(
  client: SupabaseClient
): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const { data } = await client.auth.getSession()
    if (data.session) return

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i)
      if (!key || !key.startsWith('sb-') || !key.endsWith('-auth-token')) {
        continue
      }
      const raw = localStorage.getItem(key)
      if (!raw) continue
      const parsed = JSON.parse(raw) as {
        access_token?: string
        refresh_token?: string
        currentSession?: {
          access_token?: string
          refresh_token?: string
        }
      }
      const access =
        parsed.access_token || parsed.currentSession?.access_token || ''
      const refresh =
        parsed.refresh_token || parsed.currentSession?.refresh_token || ''
      if (!access || !refresh) continue
      await client.auth.setSession({
        access_token: access,
        refresh_token: refresh,
      })
      return
    }
  } catch {
    // Ignore corrupt legacy payloads — user signs in fresh.
  }
}

/** Debug helper: whether a named auth cookie exists on the request. */
export function peekAuthCookie(event: H3Event, name: string): string | undefined {
  return getCookie(event, name)
}
