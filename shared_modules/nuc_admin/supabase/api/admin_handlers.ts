import {
  apiBody,
  apiError,
  fromSupabaseError,
  readJsonBody,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import { requirePermission, resolveUserPermissions } from '../../utils/permissions'

export async function handleAdminMe(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'me') {
    return null
  }

  try {
    const resolved = await resolveUserPermissions(ctx.supabase, userId)
    const { data: userData } = await ctx.supabase.auth.admin.getUserById(userId)
    return apiBody({
      data: {
        id: userId,
        email: userData.user?.email ?? null,
        permissions: resolved.permissions,
        roles: resolved.roles,
        bootstrap: resolved.bootstrap,
      },
    })
  } catch (e) {
    return apiError(500, e instanceof Error ? e.message : 'Failed to load me')
  }
}

export async function handleAdminRolesList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET' || ctx.segments.length !== 2 || ctx.segments[1] !== 'roles') {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'roles.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { data: roles, error } = await ctx.supabase
    .from('roles')
    .select('id, slug, name, description')
    .order('slug')
  if (error) return fromSupabaseError(error)

  const { data: rp, error: rpError } = await ctx.supabase
    .from('role_permissions')
    .select('role_id, permissions(slug)')
  if (rpError) return fromSupabaseError(rpError)

  const byRole = new Map<string, string[]>()
  for (const row of rp ?? []) {
    const nested = row.permissions as { slug?: string } | { slug?: string }[] | null
    const slug = Array.isArray(nested) ? nested[0]?.slug : nested?.slug
    if (!slug) continue
    const list = byRole.get(String(row.role_id)) ?? []
    list.push(slug)
    byRole.set(String(row.role_id), list)
  }

  const payload = (roles ?? []).map((role) => ({
    ...role,
    permission_slugs: byRole.get(String(role.id)) ?? [],
  }))

  return apiBody({ data: payload })
}

export async function handleAdminPermissionsList(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'GET' ||
    ctx.segments.length !== 2 ||
    ctx.segments[1] !== 'permissions'
  ) {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'roles.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const { data, error } = await ctx.supabase
    .from('permissions')
    .select('id, slug, name')
    .order('slug')
  if (error) return fromSupabaseError(error)
  return apiBody({ data: data ?? [] })
}

export async function handleAdminRolePermissionsPut(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  if (
    ctx.method !== 'PUT' ||
    ctx.segments.length !== 4 ||
    ctx.segments[1] !== 'roles' ||
    ctx.segments[3] !== 'permissions'
  ) {
    return null
  }

  const gate = await requirePermission(ctx.supabase, userId, 'roles.write')
  if (!gate.ok) return apiError(gate.status, gate.error)

  const roleId = String(ctx.segments[2] || '').trim()
  if (!roleId) return apiError(400, 'role id required')

  const body = await readJsonBody(ctx)
  const slugs = Array.isArray(body.permission_slugs)
    ? body.permission_slugs.map((s) => String(s).trim()).filter(Boolean)
    : null
  if (!slugs) return apiError(400, 'permission_slugs array required')

  const { data: role, error: roleError } = await ctx.supabase
    .from('roles')
    .select('id, slug')
    .eq('id', roleId)
    .maybeSingle()
  if (roleError) return fromSupabaseError(roleError)
  if (!role) return apiError(404, 'Role not found')

  const { data: perms, error: permError } = await ctx.supabase
    .from('permissions')
    .select('id, slug')
    .in('slug', slugs.length ? slugs : ['__none__'])
  if (permError) return fromSupabaseError(permError)

  const found = new Set((perms ?? []).map((p) => String(p.slug)))
  const missing = slugs.filter((s) => !found.has(s))
  if (missing.length) {
    return apiError(400, `Unknown permissions: ${missing.join(', ')}`)
  }

  const { error: delError } = await ctx.supabase
    .from('role_permissions')
    .delete()
    .eq('role_id', roleId)
  if (delError) return fromSupabaseError(delError)

  if ((perms ?? []).length > 0) {
    const rows = (perms ?? []).map((p) => ({
      role_id: roleId,
      permission_id: p.id,
    }))
    const { error: insError } = await ctx.supabase
      .from('role_permissions')
      .insert(rows)
    if (insError) return fromSupabaseError(insError)
  }

  await ctx.supabase
    .from('roles')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', roleId)

  return apiBody({
    data: {
      id: roleId,
      slug: role.slug,
      permission_slugs: slugs,
    },
  })
}
