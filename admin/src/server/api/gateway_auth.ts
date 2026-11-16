import type { SupabaseClient, User } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'

import { resolveGatewayUserFromAccessToken } from '../../../../shared_modules/index.server'

export type GatewayListScope = { mode: 'all' } | { mode: 'own'; userId: string }

export function gatewayBearerJwt(event: H3Event): string | null {
  const raw = getRequestHeader(event, 'authorization')
  return raw?.toLowerCase().startsWith('bearer ') ? raw.slice(7).trim() || null : null
}

export async function gatewayUserFromJwt(
  supabase: SupabaseClient,
  event: H3Event
): Promise<{ user: User } | { error: string; status: number }> {
  const jwt = gatewayBearerJwt(event)
  if (!jwt) return { error: 'Missing authorization token', status: 401 }
  return resolveGatewayUserFromAccessToken(supabase, jwt)
}

export async function resolveGatewayListScope(
  supabase: SupabaseClient,
  event: H3Event
): Promise<GatewayListScope | { error: string; status: number }> {
  const r = await gatewayUserFromJwt(supabase, event)
  if ('error' in r) return r
  return { mode: 'all' }
}
