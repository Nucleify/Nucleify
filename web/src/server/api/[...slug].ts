import type { SupabaseClient } from '@supabase/supabase-js'
import {
  createError,
  defineEventHandler,
  getRouterParam,
  type H3Event,
  setResponseStatus,
} from 'h3'

import type { ApiContext, Json } from '../nuc_server'

import { useRuntimeConfig } from 'nitropack/runtime'
import {
  dispatchSupabaseApiGateway,
  ensureServerEnv,
  getServiceRoleSupabaseClient,
  parseApiSlug,
} from '../../../../shared_modules/index.server'

/** Immutable pre-allocated responses for fast-path smoke routes. */
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

/** Reusable response helper avoiding closure allocation per request. */
const ok = (data: unknown, extra?: Json): Json =>
  extra ? { data, ...extra } : { data }

/** Process-level singleton client cache. */
let cachedSupabaseClient: SupabaseClient | null = null

/** For testing: reset the cached Supabase client instance. */
export function _resetSupabaseClientCache(): void {
  cachedSupabaseClient = null
}

function resolveSupabaseClient(event: H3Event): SupabaseClient {
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

export default defineEventHandler(async (event) => {
  const rawSlug = getRouterParam(event, 'slug')

  // Fast path 1: GET /api
  if (!rawSlug) {
    return GATEWAY_READY_RESPONSE
  }

  // Fast path 2: GET /api/test
  if (
    rawSlug === 'test' ||
    (Array.isArray(rawSlug) && rawSlug.length === 1 && rawSlug[0] === 'test')
  ) {
    return TEST_RESPONSE
  }

  const segments = parseApiSlug(rawSlug)
  if (segments.length === 0) {
    return GATEWAY_READY_RESPONSE
  }
  if (segments[0] === 'test') {
    return TEST_RESPONSE
  }

  // Module route dispatch: requires server-side Supabase client
  const supabase = resolveSupabaseClient(event)
  const method = (event.method || 'GET').toUpperCase()

  const ctx: ApiContext = {
    event,
    method,
    segments,
    supabase,
    ok,
  }

  const result = await dispatchSupabaseApiGateway(ctx)
  if (result.status && result.status !== 200 && event.node?.res) {
    setResponseStatus(event, result.status)
  }
  return result.body
})
