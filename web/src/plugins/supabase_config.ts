import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

import { configureSupabaseClient } from '@shared_modules'

export default defineNuxtPlugin({
  name: 'supabase_config',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()
    configureSupabaseClient({
      supabaseUrl: String(config.public.supabaseUrl || ''),
      supabaseKey: String(config.public.supabaseKey || ''),
    })
  },
})
