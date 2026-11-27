import { beforeEach, describe, expect, it, vi } from 'vitest'

const { requirePermission, clearUserPermissionsCache, readJsonBody } =
  vi.hoisted(() => ({
    requirePermission: vi.fn(),
    clearUserPermissionsCache: vi.fn(),
    readJsonBody: vi.fn(),
  }))

vi.mock('../utils/permissions', () => ({
  requirePermission: (...args: unknown[]) => requirePermission(...args),
  clearUserPermissionsCache: (...args: unknown[]) =>
    clearUserPermissionsCache(...args),
  resolveUserPermissions: vi.fn(),
}))

vi.mock('nuc_api', () => ({
  apiBody: (body: unknown, status?: number) => {
    const result: { handled: true; body: unknown; status?: number } = {
      handled: true,
      body,
    }
    if (status !== undefined) result.status = status
    return result
  },
  apiError: (status: number, message: string) => ({
    handled: true,
    status,
    body: { error: message },
  }),
  fromSupabaseError: (error: { message?: string } | null) => ({
    handled: true,
    status: 500,
    body: { error: error?.message ?? 'Database error' },
  }),
  readJsonBody: (...args: unknown[]) => readJsonBody(...args),
}))

const {
  handleAdminPermissionsList,
  handleAdminRolePermissionsPut,
  handleAdminRolesList,
} = await import('../supabase/api/admin_handlers')

type RoleRow = { id: string; slug: string; name?: string; description?: string }

function allowRolesWrite() {
  requirePermission.mockResolvedValue({
    ok: true,
    bootstrap: false,
    permissions: ['roles.write'],
  })
}

function denyRolesWrite(status = 403) {
  requirePermission.mockResolvedValue({
    ok: false,
    status,
    error: 'Forbidden',
  })
}

function ctx(partial: {
  method: string
  segments: string[]
  supabase: unknown
}) {
  return {
    event: {} as never,
    method: partial.method,
    segments: partial.segments,
    supabase: partial.supabase as never,
    ok: (data: unknown) => ({ data }),
  }
}

function putSupabase(opts: {
  role: RoleRow | null
  existingPerms?: { id: string; slug: string }[]
  ownerId?: string
}) {
  const calls = {
    upsertPerms: [] as unknown[],
    ownerLinks: [] as unknown[],
    deletedRoleId: null as string | null,
    insertedLinks: [] as unknown[],
  }

  const supabase = {
    from(table: string) {
      if (table === 'roles') {
        return {
          select: () => ({
            eq: (_col: string, value: string) => ({
              maybeSingle: async () => {
                if (value === 'owner') {
                  return {
                    data: opts.ownerId ? { id: opts.ownerId } : null,
                    error: null,
                  }
                }
                return { data: opts.role, error: null }
              },
            }),
            order: async () => ({
              data: opts.role ? [opts.role] : [],
              error: null,
            }),
          }),
          update: () => ({
            eq: async () => ({ error: null }),
          }),
        }
      }
      if (table === 'permissions') {
        return {
          select: () => ({
            in: async (_col: string, slugs: string[]) => ({
              data: (opts.existingPerms ?? []).filter((p) =>
                slugs.includes(p.slug)
              ),
              error: null,
            }),
            order: async () => ({
              data: opts.existingPerms ?? [],
              error: null,
            }),
          }),
          upsert: async (rows: unknown) => {
            calls.upsertPerms.push(rows)
            return { error: null }
          },
        }
      }
      if (table === 'role_permissions') {
        return {
          select: () =>
            Promise.resolve({
              data: [],
              error: null,
            }),
          delete: () => ({
            eq: async (_col: string, roleId: string) => {
              calls.deletedRoleId = roleId
              return { error: null }
            },
          }),
          insert: async (rows: unknown) => {
            calls.insertedLinks.push(rows)
            return { error: null }
          },
          upsert: async (rows: unknown) => {
            calls.ownerLinks.push(rows)
            return { error: null }
          },
        }
      }
      throw new Error(`unexpected table ${table}`)
    },
  }

  return { supabase, calls }
}

describe('admin roles API security', () => {
  beforeEach(() => {
    requirePermission.mockReset()
    clearUserPermissionsCache.mockReset()
    readJsonBody.mockReset()
  })

  it('lists roles only with roles.write', async () => {
    denyRolesWrite()
    const denied = await handleAdminRolesList(
      ctx({
        method: 'GET',
        segments: ['admin', 'roles'],
        supabase: putSupabase({ role: null }).supabase,
      }),
      'u1'
    )
    expect(denied).toMatchObject({ handled: true, status: 403 })

    allowRolesWrite()
    const listSb = {
      from(table: string) {
        if (table === 'roles') {
          return {
            select: () => ({
              order: async () => ({
                data: [
                  {
                    id: 'r-editor',
                    slug: 'editor',
                    name: 'Editor',
                    description: '',
                  },
                ],
                error: null,
              }),
            }),
          }
        }
        if (table === 'role_permissions') {
          return {
            select: async () => ({
              data: [
                {
                  role_id: 'r-editor',
                  permissions: { slug: 'cms.read' },
                },
              ],
              error: null,
            }),
          }
        }
        throw new Error(`unexpected table ${table}`)
      },
    }
    const ok = await handleAdminRolesList(
      ctx({ method: 'GET', segments: ['admin', 'roles'], supabase: listSb }),
      'u1'
    )
    expect(ok).toMatchObject({ handled: true })
    expect((ok as { body: { data: unknown[] } }).body.data[0]).toMatchObject({
      slug: 'editor',
      permission_slugs: ['cms.read'],
    })
  })

  it('lists permissions only with roles.write', async () => {
    denyRolesWrite()
    const denied = await handleAdminPermissionsList(
      ctx({
        method: 'GET',
        segments: ['admin', 'permissions'],
        supabase: {
          from: () => ({
            select: () => ({
              order: async () => ({ data: [], error: null }),
            }),
          }),
        },
      }),
      'u1'
    )
    expect(denied).toMatchObject({ handled: true, status: 403 })

    allowRolesWrite()
    const ok = await handleAdminPermissionsList(
      ctx({
        method: 'GET',
        segments: ['admin', 'permissions'],
        supabase: {
          from: () => ({
            select: () => ({
              order: async () => ({
                data: [{ id: 'p1', slug: 'cms.read', name: 'Read CMS' }],
                error: null,
              }),
            }),
          }),
        },
      }),
      'u1'
    )
    expect(ok).toMatchObject({ handled: true })
    expect((ok as { body: { data: unknown[] } }).body.data).toHaveLength(1)
  })

  it('rejects PUT without roles.write', async () => {
    denyRolesWrite()
    readJsonBody.mockResolvedValue({ permission_slugs: ['cms.read'] })
    const res = await handleAdminRolePermissionsPut(
      ctx({
        method: 'PUT',
        segments: ['admin', 'roles', 'r1', 'permissions'],
        supabase: putSupabase({ role: { id: 'r1', slug: 'editor' } }).supabase,
      }),
      'u1'
    )
    expect(res).toMatchObject({ handled: true, status: 403 })
  })

  it('rejects malformed permission_slugs', async () => {
    allowRolesWrite()
    readJsonBody.mockResolvedValue({ permission_slugs: 'cms.read' })
    const res = await handleAdminRolePermissionsPut(
      ctx({
        method: 'PUT',
        segments: ['admin', 'roles', 'r1', 'permissions'],
        supabase: putSupabase({ role: { id: 'r1', slug: 'editor' } }).supabase,
      }),
      'u1'
    )
    expect(res).toMatchObject({
      handled: true,
      status: 400,
      body: { error: 'permission_slugs array required' },
    })
  })

  it('rejects unknown role id', async () => {
    allowRolesWrite()
    readJsonBody.mockResolvedValue({ permission_slugs: [] })
    const res = await handleAdminRolePermissionsPut(
      ctx({
        method: 'PUT',
        segments: ['admin', 'roles', 'missing', 'permissions'],
        supabase: putSupabase({ role: null }).supabase,
      }),
      'u1'
    )
    expect(res).toMatchObject({
      handled: true,
      status: 404,
      body: { error: 'Role not found' },
    })
  })

  it('blocks mutating Owner permissions', async () => {
    allowRolesWrite()
    readJsonBody.mockResolvedValue({ permission_slugs: [] })
    const res = await handleAdminRolePermissionsPut(
      ctx({
        method: 'PUT',
        segments: ['admin', 'roles', 'r-owner', 'permissions'],
        supabase: putSupabase({
          role: { id: 'r-owner', slug: 'owner' },
        }).supabase,
      }),
      'u1'
    )
    expect(res).toMatchObject({
      handled: true,
      status: 403,
      body: { error: 'Owner permissions cannot be changed' },
    })
  })

  it('upserts missing slugs, mirrors to Owner, replaces role grants', async () => {
    allowRolesWrite()
    readJsonBody.mockResolvedValue({
      permission_slugs: ['cms.read', 'roles.read'],
    })
    const calls = {
      upsertPerms: [] as unknown[],
      ownerLinks: [] as unknown[],
      deletedRoleId: null as string | null,
      insertedLinks: [] as unknown[],
    }
    let permInCalls = 0
    const sb = {
      from(table: string) {
        if (table === 'roles') {
          return {
            select: () => ({
              eq: (_col: string, value: string) => ({
                maybeSingle: async () => {
                  if (value === 'owner') {
                    return { data: { id: 'r-owner' }, error: null }
                  }
                  return {
                    data: { id: 'r-admin', slug: 'admin' },
                    error: null,
                  }
                },
              }),
            }),
            update: () => ({
              eq: async () => ({ error: null }),
            }),
          }
        }
        if (table === 'permissions') {
          return {
            select: () => ({
              in: async (_col: string, slugs: string[]) => {
                permInCalls += 1
                const source =
                  permInCalls === 1
                    ? [{ id: 'p-cms', slug: 'cms.read' }]
                    : [
                        { id: 'p-cms', slug: 'cms.read' },
                        { id: 'p-roles-read', slug: 'roles.read' },
                      ]
                return {
                  data: source.filter((p) => slugs.includes(p.slug)),
                  error: null,
                }
              },
            }),
            upsert: async (rows: unknown) => {
              calls.upsertPerms.push(rows)
              return { error: null }
            },
          }
        }
        if (table === 'role_permissions') {
          return {
            delete: () => ({
              eq: async (_col: string, roleId: string) => {
                calls.deletedRoleId = roleId
                return { error: null }
              },
            }),
            insert: async (rows: unknown) => {
              calls.insertedLinks.push(rows)
              return { error: null }
            },
            upsert: async (rows: unknown) => {
              calls.ownerLinks.push(rows)
              return { error: null }
            },
          }
        }
        throw new Error(`unexpected table ${table}`)
      },
    }

    const res = await handleAdminRolePermissionsPut(
      ctx({
        method: 'PUT',
        segments: ['admin', 'roles', 'r-admin', 'permissions'],
        supabase: sb,
      }),
      'u1'
    )

    expect(res).toMatchObject({ handled: true })
    expect(calls.upsertPerms[0]).toEqual([
      { slug: 'roles.read', name: 'Roles Read' },
    ])
    expect(calls.ownerLinks[0]).toEqual([
      { role_id: 'r-owner', permission_id: 'p-roles-read' },
    ])
    expect(calls.deletedRoleId).toBe('r-admin')
    expect(calls.insertedLinks[0]).toEqual([
      { role_id: 'r-admin', permission_id: 'p-cms' },
      { role_id: 'r-admin', permission_id: 'p-roles-read' },
    ])
    expect(clearUserPermissionsCache).toHaveBeenCalled()
  })

  it('allows clearing grants on a non-Owner role', async () => {
    allowRolesWrite()
    readJsonBody.mockResolvedValue({ permission_slugs: [] })
    const { supabase, calls } = putSupabase({
      role: { id: 'r-editor', slug: 'editor' },
      existingPerms: [],
    })
    const res = await handleAdminRolePermissionsPut(
      ctx({
        method: 'PUT',
        segments: ['admin', 'roles', 'r-editor', 'permissions'],
        supabase,
      }),
      'u1'
    )
    expect(res).toMatchObject({ handled: true })
    expect(calls.deletedRoleId).toBe('r-editor')
    expect(calls.insertedLinks).toHaveLength(0)
    expect(clearUserPermissionsCache).toHaveBeenCalled()
  })
})
