import { createClient, type SupabaseClient } from '@supabase/supabase-js'

type NuxtPublicConfig = {
  supabaseUrl?: string
  supabaseKey?: string
}

type SupabasePublicConfig = {
  supabaseUrl: string
  supabaseKey: string
}

type BrowserSupabaseSlot = {
  client: SupabaseClient
  supabaseUrl: string
  supabaseKey: string
}

type AuthLockFn = <R>(
  name: string,
  acquireTimeout: number,
  fn: () => Promise<R>,
) => Promise<R>

/** Bump when browser client options change so HMR/globalThis cannot keep a stale client. */
const BROWSER_CLIENT_KEY = '__nucleify_supabase_browser_v2__'
const BROWSER_AUTH_LOCK_KEY = '__nucleify_supabase_auth_lock_v2__'

/** Injected by Nuxt/Next plugins — survives Nuxt 4 clearing `window.__NUXT__` after hydration. */
let injectedPublicConfig: SupabasePublicConfig | null = null

function readBrowserSlot(): BrowserSupabaseSlot | null {
  if (typeof globalThis === 'undefined') return null
  const slot = (globalThis as Record<string, unknown>)[BROWSER_CLIENT_KEY]
  return slot && typeof slot === 'object' ? (slot as BrowserSupabaseSlot) : null
}

function writeBrowserSlot(slot: BrowserSupabaseSlot | null): void {
  if (typeof globalThis === 'undefined') return
  ;(globalThis as Record<string, unknown>)[BROWSER_CLIENT_KEY] = slot
}

/**
 * Register a pre-built browser client (e.g. `@supabase/ssr` cookie client for admin).
 * Replaces any prior singleton so `getSupabaseAccessToken` / `apiRequest` share the session.
 */
export function setBrowserSupabaseClient(
  client: SupabaseClient,
  config: { supabaseUrl: string; supabaseKey: string }
): void {
  if (typeof window === 'undefined') return
  writeBrowserSlot({
    client,
    supabaseUrl: config.supabaseUrl,
    supabaseKey: config.supabaseKey,
  })
}

/**
 * In-tab queue instead of `navigator.locks`.
 * Auth-js auto-refresh uses acquireTimeout 0; Navigator LockManager then throws
 * `NavigatorLockAcquireTimeoutError` (often as an uncaught promise) whenever
 * getSession/signIn already holds the lock — common under Next HMR / Strict Mode.
 */
function getBrowserAuthLock(): AuthLockFn {
  const g = globalThis as Record<string, unknown>
  const existing = g[BROWSER_AUTH_LOCK_KEY]
  if (typeof existing === 'function') return existing as AuthLockFn

  const tails = new Map<string, Promise<unknown>>()
  const lock: AuthLockFn = async (name, _acquireTimeout, fn) => {
    const prev = tails.get(name) ?? Promise.resolve()
    const run = prev.then(
      () => fn(),
      () => fn(),
    )
    tails.set(
      name,
      run.then(
        () => undefined,
        () => undefined,
      ),
    )
    return run
  }

  g[BROWSER_AUTH_LOCK_KEY] = lock
  return lock
}

export function configureSupabaseClient(config: {
  supabaseUrl?: string
  supabaseKey?: string
}): void {
  const supabaseUrl = String(config.supabaseUrl || '')
  const supabaseKey = String(config.supabaseKey || '')
  if (!supabaseUrl || !supabaseKey) return

  injectedPublicConfig = { supabaseUrl, supabaseKey }

  const slot = readBrowserSlot()
  if (
    slot &&
    (slot.supabaseUrl !== supabaseUrl || slot.supabaseKey !== supabaseKey)
  ) {
    // Drop only when credentials change — nulling on every configure (HMR /
    // plugin re-run) leaves the old client's auto-refresh holding the auth lock.
    writeBrowserSlot(null)
  }
}

function readNuxtPublicSupabaseConfig(): NuxtPublicConfig {
  if (typeof window === 'undefined') return {}

  type NuxtWindow = Window & {
    __NUXT__?: { config?: { public?: NuxtPublicConfig } }
    useNuxtApp?: () => { $config?: { public?: NuxtPublicConfig } }
  }

  const w = window as NuxtWindow

  let fromApp: NuxtPublicConfig | undefined
  try {
    fromApp = w.useNuxtApp?.()?.$config?.public
  } catch {
    // Outside a Nuxt request context.
  }

  const fromPayload = w.__NUXT__?.config?.public
  const pub = fromApp || fromPayload

  return {
    supabaseUrl: pub?.supabaseUrl,
    supabaseKey: pub?.supabaseKey,
  }
}

/**
 * Read a bundler-inlined public env value.
 * Keep `process.env.KEY` as a static member access so Vite/Next `define` / `env` can
 * replace it; wrap in try so Astro/Vite browsers without a `process` polyfill do not throw.
 */
function readPublicEnv(read: () => string | undefined): string {
  try {
    const value = read()
    return value ? String(value) : ''
  } catch {
    return ''
  }
}

function resolveSupabaseConfig(): SupabasePublicConfig {
  const nuxtPublic = readNuxtPublicSupabaseConfig()

  const supabaseUrl = String(
    injectedPublicConfig?.supabaseUrl ||
      nuxtPublic.supabaseUrl ||
      readPublicEnv(() => process.env.NEXT_PUBLIC_SUPABASE_URL) ||
      readPublicEnv(() => process.env.SUPABASE_URL) ||
      readPublicEnv(() => process.env.NUXT_PUBLIC_SUPABASE_URL) ||
      '',
  )
  const supabaseKey = String(
    injectedPublicConfig?.supabaseKey ||
      nuxtPublic.supabaseKey ||
      readPublicEnv(() => process.env.NEXT_PUBLIC_SUPABASE_KEY) ||
      readPublicEnv(() => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
      readPublicEnv(() => process.env.SUPABASE_KEY) ||
      readPublicEnv(() => process.env.NUXT_PUBLIC_SUPABASE_KEY) ||
      '',
  )

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase config: set SUPABASE_URL and SUPABASE_KEY in .env (Nuxt: runtimeConfig.public), or NEXT_PUBLIC_* in Next.js / Astro vite.define.',
    )
  }

  return { supabaseUrl, supabaseKey }
}

export function getSupabaseClient(): SupabaseClient {
  const { supabaseUrl, supabaseKey } = resolveSupabaseConfig()

  if (typeof window !== 'undefined') {
    const existing = readBrowserSlot()
    if (
      existing &&
      existing.supabaseUrl === supabaseUrl &&
      existing.supabaseKey === supabaseKey
    ) {
      return existing.client
    }

    const client = createClient(supabaseUrl, supabaseKey, {
      auth: { lock: getBrowserAuthLock() },
    })
    writeBrowserSlot({ client, supabaseUrl, supabaseKey })
    return client
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function getSupabaseAccessToken(): Promise<string | undefined> {
  if (typeof window === 'undefined') return undefined

  try {
    const {
      data: { session },
    } = await getSupabaseClient().auth.getSession()

    return session?.access_token
  } catch {
    return undefined
  }
}
