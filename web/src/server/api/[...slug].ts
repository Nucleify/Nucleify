import { createClient } from '@supabase/supabase-js'
import {
  createError,
  defineEventHandler,
  getMethod,
  getRouterParam,
  setResponseStatus,
} from 'h3'

import type { ApiContext, Json } from './_types'

import { useRuntimeConfig } from 'nitropack/runtime'
import {
  dispatchSupabaseApiGateway,
  parseApiSlug,
} from '../../../../shared_modules/nuc_api/supabase/api/gateway_dispatch'
import { ensureServerEnv } from '../../../../shared_modules/nuc_api/supabase/api/server_env'

export default defineEventHandler(async (event) => {
  ensureServerEnv()
  const method = getMethod(event).toUpperCase()
  const segments = parseApiSlug(getRouterParam(event, 'slug'))

  // Smoke / readiness — no Supabase client required.
  if (segments.length === 0) {
    setResponseStatus(event, 200)
    return { data: { message: 'Supabase API gateway ready.' } }
  }
  if (segments[0] === 'test') {
    setResponseStatus(event, 200)
    return { message: 'Hello World' }
  }

  const config = useRuntimeConfig(event)
  const supabaseUrl = String(
    config.public.supabaseUrl || process.env.SUPABASE_URL || ''
  )
  const serviceRoleKey = String(
    config.supabaseServiceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
  if (!supabaseUrl || !serviceRoleKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Supabase is not configured.',
      data: {
        error:
          'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the monorepo .env (see web/.config/.env.example).',
      },
    })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const ok = (data: unknown, extra: Json = {}) => ({ data, ...extra })
  const ctx: ApiContext = { event, method, segments, supabase, ok }
  const result = await dispatchSupabaseApiGateway(ctx)
  setResponseStatus(event, result.status)
  return result.body
})
