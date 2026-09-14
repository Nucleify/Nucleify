import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import type { ApiContext, ApiHandlerResult, Json } from 'nuc_server'

import { handleColorsApi } from '../../../nuc_colors/supabase/api/handle'
import { handleLanguagesApi } from '../../../nuc_languages/supabase/api/handle'

export const supabaseApiGatewayHandlers = [
  handleColorsApi,
  handleLanguagesApi,
] as const

export function parseApiSlug(slug: string | string[] | undefined): string[] {
  const raw = Array.isArray(slug) ? slug.join('/') : String(slug ?? '')
  return raw
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)
}

const defaultOk = (data: unknown, extra: Json = {}) => ({ data, ...extra })

export async function dispatchSupabaseApiGateway(
  ctx: ApiContext
): Promise<{ status: number; body: unknown }> {
  const ok = ctx.ok ?? defaultOk
  const gatewayCtx: ApiContext = { ...ctx, ok }
  const { segments } = gatewayCtx

  if (segments.length === 0) {
    return { status: 200, body: ok({ message: 'Supabase API gateway ready.' }) }
  }
  if (segments[0] === 'test') {
    return { status: 200, body: { message: 'Hello World' } }
  }

  for (const handler of supabaseApiGatewayHandlers) {
    const result: ApiHandlerResult = await handler(gatewayCtx)
    if (!result.handled) continue
    return { status: result.status ?? 200, body: result.body }
  }

  return { status: 404, body: { error: 'Not found' } }
}

export function createServiceRoleSupabaseClient(): SupabaseClient {
  const supabaseUrl = String(
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      process.env.NUXT_PUBLIC_SUPABASE_URL ||
      ''
  )
  const serviceRoleKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '')

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase server config: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.'
    )
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
