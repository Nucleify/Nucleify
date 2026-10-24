import type { SupabaseClient } from '@supabase/supabase-js'

import type { AdminPermissionSlug } from '../constants/permissions'

export type PermissionCheckResult =
  | { ok: true; bootstrap: boolean; permissions: string[] }
  | { ok: false; status: number; error: string }

/**
 * Resolve permission slugs for a user.
 * First-run bootstrap: when `user_roles` is empty, every authenticated user
 * is treated as having full access so an owner can be assigned.
 */
export async function resolveUserPermissions(
  supabase: SupabaseClient,
  userId: string
): Promise<{ permissions: string[]; roles: string[]; bootstrap: boolean }> {
  const { count, error: countError } = await supabase
    .from('user_roles')
    .select('user_id', { count: 'exact', head: true })

  if (countError) {
    throw new Error(countError.message)
  }

  if ((count ?? 0) === 0) {
    const { data: allPerms, error } = await supabase
      .from('permissions')
      .select('slug')
    if (error) throw new Error(error.message)
    return {
      permissions: (allPerms ?? []).map((p) => String(p.slug)),
      roles: [],
      bootstrap: true,
    }
  }

  const { data: userRoles, error: urError } = await supabase
    .from('user_roles')
    .select('role_id, roles(slug)')
    .eq('user_id', userId)
  if (urError) throw new Error(urError.message)

  const roleIds = (userRoles ?? []).map((row) => String(row.role_id))
  const roles = (userRoles ?? [])
    .map((row) => {
      const nested = row.roles as { slug?: string } | { slug?: string }[] | null
      if (Array.isArray(nested)) return nested[0]?.slug
      return nested?.slug
    })
    .filter((s): s is string => Boolean(s))

  if (roleIds.length === 0) {
    return { permissions: [], roles: [], bootstrap: false }
  }

  const { data: rp, error: rpError } = await supabase
    .from('role_permissions')
    .select('permission_id, permissions(slug)')
    .in('role_id', roleIds)
  if (rpError) throw new Error(rpError.message)

  const permissions = [
    ...new Set(
      (rp ?? [])
        .map((row) => {
          const nested = row.permissions as
            | { slug?: string }
            | { slug?: string }[]
            | null
          if (Array.isArray(nested)) return nested[0]?.slug
          return nested?.slug
        })
        .filter((s): s is string => Boolean(s))
    ),
  ]

  return { permissions, roles, bootstrap: false }
}

export async function requirePermission(
  supabase: SupabaseClient,
  userId: string,
  slug: AdminPermissionSlug | string
): Promise<PermissionCheckResult> {
  try {
    const resolved = await resolveUserPermissions(supabase, userId)
    if (resolved.bootstrap || resolved.permissions.includes(slug)) {
      return {
        ok: true,
        bootstrap: resolved.bootstrap,
        permissions: resolved.permissions,
      }
    }
    return {
      ok: false,
      status: 403,
      error: `Missing permission: ${slug}`,
    }
  } catch (e) {
    return {
      ok: false,
      status: 500,
      error: e instanceof Error ? e.message : 'Permission check failed',
    }
  }
}
