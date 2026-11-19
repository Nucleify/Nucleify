import type { SupabaseClient } from '@supabase/supabase-js'
import {
  createError,
  getRouterParam,
  type H3Event,
  setResponseStatus,
} from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'

import {
  dispatchSupabaseApiGateway,
  ensureServerEnv,
  getServiceRoleSupabaseClient,
  parseApiSlug,
} from '../../../../shared_modules/index.server'
import type { ApiContext, Json } from '../nuc_server'

const GATEWAY_READY_RESPONSE = Object.freeze({
  data: { message: 'Supabase API gateway ready.' },
})

const TEST_RESPONSE = Object.freeze({
  message: 'Hello World',
})

const CONFIG_MISSING_ERROR = Object.freeze({
  statusCode: 503,
  statusMessage: 'Supabase is not configured.',
  data: {
    error:
      'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the monorepo .env (see web/.config/.env.example).',
  },
})

const ok = (data: unknown, extra?: Json): Json =>
  extra ? { data, ...extra } : { data }

let cachedSupabaseClient: SupabaseClient | null = null

export function _resetSupabaseClientCache(): void {
  cachedSupabaseClient = null
}

export function resolveSupabaseClient(event: H3Event): SupabaseClient {
  ensureServerEnv()

  const config = useRuntimeConfig(event)
  const supabaseUrl = String(
    config.public?.supabaseUrl || process.env.SUPABASE_URL || ''
  )
  const serviceRoleKey = String(
    config.supabaseServiceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
  if (!supabaseUrl || !serviceRoleKey) {
    cachedSupabaseClient = null
    throw createError(CONFIG_MISSING_ERROR)
  }

  if (cachedSupabaseClient) {
    return cachedSupabaseClient
  }

  const client = getServiceRoleSupabaseClient(supabaseUrl, serviceRoleKey)
  cachedSupabaseClient = client
  return client
}

export async function handleApiGatewayEvent(event: H3Event): Promise<unknown> {
  const segments = parseApiSlug(getRouterParam(event, 'slug'))
  if (segments.length === 0) return GATEWAY_READY_RESPONSE
  if (segments[0] === 'test') return TEST_RESPONSE

  const supabase = resolveSupabaseClient(event)
  const method = (event.method || 'GET').toUpperCase()

  const ctx: ApiContext = { event, method, segments, supabase, ok }
  const result = await dispatchSupabaseApiGateway(ctx)
  if (result.status && result.status !== 200 && event.node?.res) {
    setResponseStatus(event, result.status)
  }
  return result.body
}
