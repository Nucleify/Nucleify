import type {
  AdminPermissionSlug,
  AdminRoleSlug,
} from '../constants/permissions'

export interface NucAdminPermissionInterface {
  id: string
  slug: AdminPermissionSlug | string
  name: string
}

export interface NucAdminRoleInterface {
  id: string
  slug: AdminRoleSlug | string
  name: string
  description: string
  permission_slugs: string[]
}

export interface NucAdminMeInterface {
  id: string
  email: string | null
  permissions: string[]
  roles: string[]
  bootstrap: boolean
}
