import type { SupabaseClient, User } from '@supabase/supabase-js'

/**
 * Verify an access token locally via JWKS (`getClaims`) when the project uses
 * asymmetric signing keys. Falls back to Auth `getUser` only for HS* tokens.
 * Prefer this over `auth.getUser(jwt)` on every request (remote RTT).
 */
export async function resolveGatewayUserFromAccessToken(
  supabase: SupabaseClient,
  jwt: string
): Promise<{ user: User } | { error: string; status: number }> {
  let data: Awaited<ReturnType<SupabaseClient['auth']['getClaims']>>['data']
  let error: Awaited<ReturnType<SupabaseClient['auth']['getClaims']>>['error']
  try {
    ;({ data, error } = await supabase.auth.getClaims(jwt))
  } catch (e) {
    // auth-js may throw (e.g. missing `exp` on forged/alg=none tokens) instead
    // of returning `{ error }` — never surface that as an uncaught 500.
    const message = e instanceof Error ? e.message : 'Invalid token'
    return { error: message || 'Invalid token', status: 401 }
  }
  const sub = data?.claims?.sub
  if (error || !data?.claims || !sub) {
    return { error: error?.message ?? 'Invalid token', status: 401 }
  }

  const claims = data.claims
  const email = typeof claims.email === 'string' ? claims.email : undefined
  const phone = typeof claims.phone === 'string' ? claims.phone : undefined
  const appMetadata =
    claims.app_metadata && typeof claims.app_metadata === 'object'
      ? (claims.app_metadata as User['app_metadata'])
      : {}
  const userMetadata =
    claims.user_metadata && typeof claims.user_metadata === 'object'
      ? (claims.user_metadata as User['user_metadata'])
      : {}

  const user = {
    id: String(sub),
    aud: String(claims.aud ?? 'authenticated'),
    role: typeof claims.role === 'string' ? claims.role : 'authenticated',
    email,
    phone,
    app_metadata: appMetadata,
    user_metadata: userMetadata,
    created_at: '',
  } as User

  return { user }
}
