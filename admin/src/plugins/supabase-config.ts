import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

import { configureSupabaseClient, setBrowserSupabaseClient } from '@shared_modules'

import {
  createAdminBrowserClient,
  createAdminServerClient,
  migrateLegacyLocalStorageSession,
} from '../utils/supabase_auth'
import { useAdminAuth } from '../composables/use_admin_auth'

/**
 * Cookie-backed Supabase auth for admin (SSR-readable sessions).
 * Registers the browser client into the shared singleton so `apiRequest`
 * attaches the same access token.
 */
export default defineNuxtPlugin({
  name: 'supabase-config',
  enforce: 'pre',
  async setup() {
    const config = useRuntimeConfig()
    const supabaseUrl = String(config.public.supabaseUrl || '')
    const supabaseKey = String(config.public.supabaseKey || '')
    configureSupabaseClient({ supabaseUrl, supabaseKey })

    const auth = useAdminAuth()

    if (import.meta.server) {
      const event = useRequestEvent()
      if (!event) {
        auth.applySession(null)
        return
      }
      const client = createAdminServerClient(event)
      const { data } = await client.auth.getSession()
      auth.applySession(data.session ?? null)
      return
    }

    const client = createAdminBrowserClient()
    setBrowserSupabaseClient(client, { supabaseUrl, supabaseKey })

    await migrateLegacyLocalStorageSession(client)

    const { data } = await client.auth.getSession()
    auth.applySession(data.session ?? null)

    client.auth.onAuthStateChange((_event, next) => {
      auth.applySession(next)
    })
  },
})
