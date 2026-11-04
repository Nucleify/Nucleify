import {
  apiBody,
  apiError,
  escapeIlike,
  fromSupabaseError,
  normalizeUuid,
  readJsonBody,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'
import { getQuery } from 'h3'

import {
  clearUserPermissionsCache,
  requirePermission,
} from '../../utils/permissions'

async function loadUserRoleSlugs(
  ctx: ApiContext,
  userIds: string[]
): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>()
  if (userIds.length === 0) return map
  const { data, error } = await ctx.supabase
    .from('user_roles')
    .select('user_id, roles(slug)')
    .in('user_id', userIds)
  if (error || !data) return map
  for (const row of data) {
    const uid = String(row.user_id)
    const nested = row.roles as { slug?: string } | { slug?: string }[] | null
    const slug = Array.isArray(nested) ? nested[0]?.slug : nested?.slug
    if (!slug) continue
    const list = map.get(uid) ?? []
    list.push(slug)
    map.set(uid, list)
  }
  return map
}

export async function handleAdminUsersList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'users') {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'users.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const query = getQuery(ctx.event)
  const search = String(query.search ?? '').trim()

  let q = ctx.supabase
    .from('user_profiles')
    .select('id, email, display_name, locale, status, created_at, updated_at')
    .order('created_at', { ascending: false })
    .limit(100)

  if (search) {
    const term = `%${escapeIlike(search)}%`
    q = q.or(`email.ilike.${term},display_name.ilike.${term}`)
  }

  const { data, error } = await q
  if (error) return fromSupabaseError(error)

  const ids = (data ?? []).map((row) => String(row.id))
  const rolesByUser = await loadUserRoleSlugs(ctx, ids)
  const payload = (data ?? []).map((row) => ({
    ...row,
    role_slugs: rolesByUser.get(String(row.id)) ?? [],
  }))

  return apiBody({ data: payload })
}

export async function handleAdminUserGet(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 3 || ctx.segments[1] !== 'users') {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'users.read')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const id = normalizeUuid(ctx.segments[2])
  if (!id) return apiError(400, 'Invalid user id')

  const { data, error } = await ctx.supabase
    .from('user_profiles')
    .select('id, email, display_name, locale, status, created_at, updated_at')
    .eq('id', id)
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'User not found')

  const rolesByUser = await loadUserRoleSlugs(ctx, [id])
  const { data: roles } = await ctx.supabase
    .from('roles')
    .select('id, slug, name')
    .order('slug')

  return apiBody({
    data: {
      ...data,
      role_slugs: rolesByUser.get(id) ?? [],
      available_roles: roles ?? [],
    },
  })
}

export async function handleAdminUserCreate(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'POST' || ctx.segments.length !== 2 || ctx.segments[1] !== 'users') {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'users.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const body = await readJsonBody(ctx)
  const email = String(body.email ?? '')
    .trim()
    .toLowerCase()
  const password = String(body.password ?? '')
  const displayName = String(body.display_name ?? '').trim()
  const locale = String(body.locale ?? 'en').trim() || 'en'

  if (!email || !password) {
    return apiError(400, 'email and password are required')
  }
  if (password.length < 8) {
    return apiError(400, 'password must be at least 8 characters')
  }

  const { data: created, error: createError } =
    await ctx.supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name: displayName },
    })
  if (createError) return apiError(400, createError.message)
  const newId = created.user?.id
  if (!newId) return apiError(500, 'User create returned no id')

  const now = new Date().toISOString()
  const { data: profile, error: profileError } = await ctx.supabase
    .from('user_profiles')
    .upsert(
      {
        id: newId,
        email,
        display_name: displayName,
        locale,
        status: 'active',
        updated_at: now,
      },
      { onConflict: 'id' }
    )
    .select('id, email, display_name, locale, status, created_at, updated_at')
    .single()
  if (profileError) return fromSupabaseError(profileError)

  return apiBody({ data: { ...profile, role_slugs: [] } }, 201)
}

export async function handleAdminUserPatch(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    !['PATCH', 'PUT'].includes(ctx.method) ||
    ctx.segments.length !== 3 ||
    ctx.segments[1] !== 'users'
  ) {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'users.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const id = normalizeUuid(ctx.segments[2])
  if (!id) return apiError(400, 'Invalid user id')

  const body = await readJsonBody(ctx)
  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (body.display_name !== undefined) {
    patch.display_name = String(body.display_name ?? '').trim()
  }
  if (body.email !== undefined) {
    patch.email = String(body.email ?? '')
      .trim()
      .toLowerCase()
  }
  if (body.locale !== undefined) {
    patch.locale = String(body.locale ?? 'en').trim() || 'en'
  }
  if (body.status !== undefined) {
    const status = String(body.status)
    if (status !== 'active' && status !== 'disabled') {
      return apiError(400, 'status must be active or disabled')
    }
    patch.status = status
  }

  const { data, error } = await ctx.supabase
    .from('user_profiles')
    .update(patch)
    .eq('id', id)
    .select('id, email, display_name, locale, status, created_at, updated_at')
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'User not found')

  if (Array.isArray(body.role_slugs)) {
    const slugs = body.role_slugs.map((s) => String(s).trim()).filter(Boolean)
    const { data: roles, error: rolesError } = await ctx.supabase
      .from('roles')
      .select('id, slug')
      .in('slug', slugs.length ? slugs : ['__none__'])
    if (rolesError) return fromSupabaseError(rolesError)

    const { error: delError } = await ctx.supabase
      .from('user_roles')
      .delete()
      .eq('user_id', id)
    if (delError) return fromSupabaseError(delError)

    if ((roles ?? []).length > 0) {
      const rows = (roles ?? []).map((r) => ({
        user_id: id,
        role_id: r.id,
      }))
      const { error: insError } = await ctx.supabase.from('user_roles').insert(rows)
      if (insError) return fromSupabaseError(insError)
    }
    clearUserPermissionsCache()
  }

  const rolesByUser = await loadUserRoleSlugs(ctx, [id])
  return apiBody({
    data: { ...data, role_slugs: rolesByUser.get(id) ?? [] },
  })
}
