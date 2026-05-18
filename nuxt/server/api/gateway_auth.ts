import type { SupabaseClient, User } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'

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
  const { data, error } = await supabase.auth.getUser(jwt)
  if (error || !data.user)
    return { error: error?.message ?? 'Invalid token', status: 401 }
  return { user: data.user }
}

function refererSlug(event: H3Event): string {
  return (
    getRequestHeader(event, 'referer-slug') ??
    getRequestHeader(event, 'Referer-Slug') ??
    ''
  )
}

/**
 * `/admin` → pełna lista (service role). Inne ścieżki (np. `/entities`) → tylko rekordy `user_id` = JWT.
 */
export async function resolveGatewayListScope(
  supabase: SupabaseClient,
  event: H3Event
): Promise<GatewayListScope | { error: string; status: number }> {
  if (refererSlug(event).includes('/admin')) {
    return { mode: 'all' }
  }
  const r = await gatewayUserFromJwt(supabase, event)
  if ('error' in r) return r
  return { mode: 'own', userId: r.user.id }
}
