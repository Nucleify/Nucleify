import { createClient } from '@supabase/supabase-js'
import {
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
} from '../../../modules/nuc_api/supabase/api/gateway_dispatch'
import { ensureServerEnv } from '../../../modules/nuc_api/supabase/api/server_env'

export default defineEventHandler(async (event) => {
  ensureServerEnv()
  const method = getMethod(event).toUpperCase()
  const segments = parseApiSlug(getRouterParam(event, 'slug'))
  const config = useRuntimeConfig(event)
  const supabaseUrl = String(config.public.supabaseUrl || '')
  const serviceRoleKey = String(config.supabaseServiceRoleKey || '')
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const ok = (data: unknown, extra: Json = {}) => ({ data, ...extra })
  const ctx: ApiContext = { event, method, segments, supabase, ok }
  const result = await dispatchSupabaseApiGateway(ctx)
  setResponseStatus(event, result.status)
  return result.body
})
