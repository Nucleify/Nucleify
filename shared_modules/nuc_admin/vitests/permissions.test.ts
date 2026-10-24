import { describe, expect, it } from 'vitest'

import { requirePermission, resolveUserPermissions } from '../utils/permissions'

function mockSupabase(handlers: {
  userRolesCount?: number
  allPerms?: { slug: string }[]
  userRoles?: unknown[]
  rolePermissions?: unknown[]
}) {
  return {
    from(table: string) {
      if (table === 'user_roles') {
        return {
          select(_cols: string, opts?: { count?: string; head?: boolean }) {
            if (opts?.head) {
              return Promise.resolve({
                count: handlers.userRolesCount ?? 0,
                error: null,
              })
            }
            return {
              eq: () =>
                Promise.resolve({
                  data: handlers.userRoles ?? [],
                  error: null,
                }),
            }
          },
        }
      }
      if (table === 'permissions') {
        return {
          select: () =>
            Promise.resolve({
              data: handlers.allPerms ?? [{ slug: 'roles.write' }],
              error: null,
            }),
        }
      }
      if (table === 'role_permissions') {
        return {
          select: () => ({
            in: () =>
              Promise.resolve({
                data: handlers.rolePermissions ?? [],
                error: null,
              }),
          }),
        }
      }
      throw new Error(`unexpected table ${table}`)
    },
  }
}

describe('resolveUserPermissions', () => {
  it('bootstraps when user_roles is empty', async () => {
    const supabase = mockSupabase({
      userRolesCount: 0,
      allPerms: [{ slug: 'roles.write' }, { slug: 'users.read' }],
    })
    const result = await resolveUserPermissions(supabase as never, 'u1')
    expect(result.bootstrap).toBe(true)
    expect(result.permissions).toEqual(['roles.write', 'users.read'])
  })

  it('returns empty when user has no roles after bootstrap ended', async () => {
    const supabase = mockSupabase({
      userRolesCount: 2,
      userRoles: [],
    })
    const result = await resolveUserPermissions(supabase as never, 'u1')
    expect(result.bootstrap).toBe(false)
    expect(result.permissions).toEqual([])
  })
})

describe('requirePermission', () => {
  it('allows bootstrap users any permission', async () => {
    const supabase = mockSupabase({
      userRolesCount: 0,
      allPerms: [{ slug: 'roles.write' }],
    })
    const result = await requirePermission(
      supabase as never,
      'u1',
      'roles.write'
    )
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.bootstrap).toBe(true)
  })

  it('rejects missing permission when not bootstrapping', async () => {
    const supabase = mockSupabase({
      userRolesCount: 1,
      userRoles: [{ role_id: 'r1', roles: { slug: 'editor' } }],
      rolePermissions: [
        { permission_id: 'p1', permissions: { slug: 'cms.read' } },
      ],
    })
    const result = await requirePermission(
      supabase as never,
      'u1',
      'roles.write'
    )
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.status).toBe(403)
  })
})
