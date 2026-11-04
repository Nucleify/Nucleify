import { apiBody, fromSupabaseError, readJsonBody } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import { resolveUserPermissions } from '../../utils/permissions'

export async function handleAdminMePatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    !['PATCH', 'PUT'].includes(ctx.method) ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'me'
  ) {
    return null
  }

  const body = await readJsonBody(ctx)
  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (body.display_name !== undefined) {
    patch.display_name = String(body.display_name ?? '').trim()
  }
  if (body.locale !== undefined) {
    patch.locale = String(body.locale ?? 'en').trim() || 'en'
  }

  const { data: existing } = await ctx.supabase
    .from('user_profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle()

  if (!existing) {
    const { data: authUser } = await ctx.supabase.auth.admin.getUserById(userId)
    const { error: upsertError } = await ctx.supabase.from('user_profiles').upsert({
      id: userId,
      email: authUser.user?.email ?? null,
      display_name: String(patch.display_name ?? ''),
      locale: String(patch.locale ?? 'en'),
      status: 'active',
      updated_at: patch.updated_at,
    })
    if (upsertError) return fromSupabaseError(upsertError)
  } else if (Object.keys(patch).length > 1) {
    const { error } = await ctx.supabase
      .from('user_profiles')
      .update(patch)
      .eq('id', userId)
    if (error) return fromSupabaseError(error)
  }

  const { data: profile, error: profileError } = await ctx.supabase
    .from('user_profiles')
    .select('id, email, display_name, locale, status')
    .eq('id', userId)
    .maybeSingle()
  if (profileError) return fromSupabaseError(profileError)

  const resolved = await resolveUserPermissions(ctx.supabase, userId)
  return apiBody({
    data: {
      ...profile,
      permissions: resolved.permissions,
      roles: resolved.roles,
      bootstrap: resolved.bootstrap,
    },
  })
}
