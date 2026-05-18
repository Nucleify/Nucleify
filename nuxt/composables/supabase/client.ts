import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from 'nuxt/app'

const resolveSupabaseConfig = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = String(config.public.supabaseUrl || '')
  const supabaseKey = String(config.public.supabaseKey || '')

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase runtime config: SUPABASE_URL and SUPABASE_KEY are required.'
    )
  }

  return { supabaseUrl, supabaseKey }
}

let browserSupabase: SupabaseClient | null = null

export const useSupabaseClient = () => {
  const { supabaseUrl, supabaseKey } = resolveSupabaseConfig()
  if (import.meta.client) {
    if (!browserSupabase)
      browserSupabase = createClient(supabaseUrl, supabaseKey)
    return browserSupabase
  }
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export const useSupabaseServerClient = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = String(config.public.supabaseUrl || '')
  const serviceRoleKey = String(config.supabaseServiceRoleKey || '')

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase server runtime config: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.'
    )
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
