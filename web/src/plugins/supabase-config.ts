import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

import { configureSupabaseClient } from '../../../shared_modules/nuc_api/supabase/client'

/**
 * Wire monorepo-root `.env` values (via runtimeConfig) into the shared Supabase
 * browser client. Nuxt 4 clears `window.__NUXT__` after hydration, so reading
 * public config from the payload alone is not enough.
 */
export default defineNuxtPlugin({
  name: 'supabase-config',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()
    configureSupabaseClient({
      supabaseUrl: String(config.public.supabaseUrl || ''),
      supabaseKey: String(config.public.supabaseKey || ''),
    })
  },
})
