import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null

type NuxtPublicConfig = {
  supabaseUrl?: string
  supabaseKey?: string
}

function readNuxtPublicSupabaseConfig(): NuxtPublicConfig {
  if (typeof window === 'undefined') return {}

  const pub = (
    window as Window & { __NUXT__?: { config?: { public?: NuxtPublicConfig } } }
  ).__NUXT__?.config?.public

  return {
    supabaseUrl: pub?.supabaseUrl,
    supabaseKey: pub?.supabaseKey,
  }
}

function resolveSupabaseConfig(): { supabaseUrl: string; supabaseKey: string } {
  const nuxtPublic = readNuxtPublicSupabaseConfig()

  const supabaseUrl = String(
    nuxtPublic.supabaseUrl ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      ''
  )
  const supabaseKey = String(
    nuxtPublic.supabaseKey ||
      process.env.NEXT_PUBLIC_SUPABASE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_KEY ||
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
