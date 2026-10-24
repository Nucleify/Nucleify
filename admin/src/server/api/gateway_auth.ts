import type { SupabaseClient, User } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'

import { resolveGatewayUserFromAccessToken } from '../../../../shared_modules/nuc_api/supabase/api/gateway_jwt'

export type GatewayListScope = { mode: 'all' } | { mode: 'own'; userId: string }

export function gatewayBearerJwt(event: H3Event): string | null {
  const raw =
    getRequestHeader(event, 'authorization') ??
    getRequestHeader(event, 'Authorization')
  if (!raw?.toLowerCase().startsWith('bearer ')) return null
  const token = raw.slice(7).trim()
  return token || null
}

export async function gatewayUserFromJwt(
  supabase: SupabaseClient,
  event: H3Event
): Promise<{ user: User } | { error: string; status: number }> {
  const jwt = gatewayBearerJwt(event)
  if (!jwt) return { error: 'Missing authorization token', status: 401 }
  return resolveGatewayUserFromAccessToken(supabase, jwt)
}

/**
 * Admin host always lists with service-role scope after JWT validation.
 */
export async function resolveGatewayListScope(
  supabase: SupabaseClient,
  event: H3Event
): Promise<GatewayListScope | { error: string; status: number }> {
  const r = await gatewayUserFromJwt(supabase, event)
  if ('error' in r) return r
  return { mode: 'all' }
}
