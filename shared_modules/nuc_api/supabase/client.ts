import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null

type NuxtPublicConfig = {
  supabaseUrl?: string
  supabaseKey?: string
}

type SupabasePublicConfig = {
  supabaseUrl: string
  supabaseKey: string
}

/** Injected by Nuxt/Next plugins — survives Nuxt 4 clearing `window.__NUXT__` after hydration. */
let injectedPublicConfig: SupabasePublicConfig | null = null

export function configureSupabaseClient(config: {
  supabaseUrl?: string
  supabaseKey?: string
}): void {
  const supabaseUrl = String(config.supabaseUrl || '')
  const supabaseKey = String(config.supabaseKey || '')
  if (!supabaseUrl || !supabaseKey) return
  injectedPublicConfig = { supabaseUrl, supabaseKey }
  browserClient = null
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

function resolveSupabaseConfig(): SupabasePublicConfig {
  const nuxtPublic = readNuxtPublicSupabaseConfig()

  const supabaseUrl = String(
    injectedPublicConfig?.supabaseUrl ||
      nuxtPublic.supabaseUrl ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      process.env.NUXT_PUBLIC_SUPABASE_URL ||
      ''
  )
  const supabaseKey = String(
    injectedPublicConfig?.supabaseKey ||
      nuxtPublic.supabaseKey ||
      process.env.NEXT_PUBLIC_SUPABASE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_KEY ||
      process.env.NUXT_PUBLIC_SUPABASE_KEY ||
      ''
  )

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase config: set SUPABASE_URL and SUPABASE_KEY in .env (Nuxt: runtimeConfig.public), or NEXT_PUBLIC_* in Next.js.'
    )
  }

  return { supabaseUrl, supabaseKey }
}

export function getSupabaseClient(): SupabaseClient {
  const { supabaseUrl, supabaseKey } = resolveSupabaseConfig()

  if (typeof window !== 'undefined') {
    if (!browserClient) {
      browserClient = createClient(supabaseUrl, supabaseKey)
    }
    return browserClient
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
