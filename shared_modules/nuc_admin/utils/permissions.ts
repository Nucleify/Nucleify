import type { SupabaseClient } from '@supabase/supabase-js'

import type { AdminPermissionSlug } from '../constants/permissions'

export type PermissionCheckResult =
  | { ok: true; bootstrap: boolean; permissions: string[] }
  | { ok: false; status: number; error: string }

type ResolvedPermissions = {
  permissions: string[]
  roles: string[]
  bootstrap: boolean
}

const PERMISSIONS_TTL_MS = 60_000
const BOOTSTRAP_TTL_MS = 60_000

const permissionsCache = new Map<
  string,
  { expiresAt: number; value: ResolvedPermissions }
>()
let bootstrapEmptyCache: { expiresAt: number; empty: boolean } | null = null

export function clearUserPermissionsCache(userId?: string): void {
  if (userId) {
    permissionsCache.delete(userId)
    return
  }
  permissionsCache.clear()
  bootstrapEmptyCache = null
}

function readPermissionsCache(userId: string): ResolvedPermissions | null {
  const hit = permissionsCache.get(userId)
  if (!hit) return null
  if (hit.expiresAt <= Date.now()) {
    permissionsCache.delete(userId)
    return null
  }
  return hit.value
}

function writePermissionsCache(
  userId: string,
  value: ResolvedPermissions
): void {
  permissionsCache.set(userId, {
    expiresAt: Date.now() + PERMISSIONS_TTL_MS,
    value,
  })
}

function nestedSlug(
  nested: { slug?: string } | { slug?: string }[] | null | undefined
): string | undefined {
  if (Array.isArray(nested)) return nested[0]?.slug
  return nested?.slug
}

async function isUserRolesTableEmpty(
  supabase: SupabaseClient
): Promise<boolean> {
  if (bootstrapEmptyCache && bootstrapEmptyCache.expiresAt > Date.now()) {
    return bootstrapEmptyCache.empty
  }
  const { count, error } = await supabase
    .from('user_roles')
    .select('user_id', { count: 'exact', head: true })
  if (error) throw new Error(error.message)
  const empty = (count ?? 0) === 0
  bootstrapEmptyCache = {
    expiresAt: Date.now() + BOOTSTRAP_TTL_MS,
    empty,
  }
  return empty
}

/**
 * Resolve permission slugs for a user.
 * First-run bootstrap: when `user_roles` is empty, every authenticated user
 * is treated as having full access so an owner can be assigned.
 */
export async function resolveUserPermissions(
  supabase: SupabaseClient,
  userId: string
): Promise<ResolvedPermissions> {
  const cached = readPermissionsCache(userId)
  if (cached) return cached

  const { data: userRoles, error: urError } = await supabase
    .from('user_roles')
    .select('role_id, roles(slug)')
    .eq('user_id', userId)
  if (urError) throw new Error(urError.message)

  const roleIds = (userRoles ?? []).map((row) => String(row.role_id))
  const roles = (userRoles ?? [])
    .map((row) =>
      nestedSlug(row.roles as { slug?: string } | { slug?: string }[] | null)
    )
    .filter((s): s is string => Boolean(s))

  if (roleIds.length === 0) {
    if (await isUserRolesTableEmpty(supabase)) {
      const { data: allPerms, error } = await supabase
        .from('permissions')
        .select('slug')
      if (error) throw new Error(error.message)
      const value: ResolvedPermissions = {
        permissions: (allPerms ?? []).map((p) => String(p.slug)),
        roles: [],
        bootstrap: true,
      }
      writePermissionsCache(userId, value)
      return value
    }
    const value: ResolvedPermissions = {
      permissions: [],
      roles: [],
      bootstrap: false,
    }
    writePermissionsCache(userId, value)
    return value
  }

  // Any assigned role means bootstrap is over.
  bootstrapEmptyCache = {
    expiresAt: Date.now() + BOOTSTRAP_TTL_MS,
    empty: false,
  }

  const { data: rp, error: rpError } = await supabase
    .from('role_permissions')
    .select('permission_id, permissions(slug)')
    .in('role_id', roleIds)
  if (rpError) throw new Error(rpError.message)

  const permissions = [
    ...new Set(
      (rp ?? [])
        .map((row) =>
          nestedSlug(
            row.permissions as { slug?: string } | { slug?: string }[] | null
          )
        )
        .filter((s): s is string => Boolean(s))
    ),
  ]

  const value: ResolvedPermissions = {
    permissions,
    roles,
    bootstrap: false,
  }
  writePermissionsCache(userId, value)
  return value
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
