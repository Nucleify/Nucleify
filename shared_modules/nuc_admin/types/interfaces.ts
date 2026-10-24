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
  display_name?: string
  locale?: string
  status?: string
  permissions: string[]
  roles: string[]
  bootstrap: boolean
}

export interface NucAdminCmsEntryInterface {
  id: string
  slug: string
  locale: string
  title: string
  body: string
  status: 'draft' | 'published' | string
  created_at?: string
  updated_at?: string
}
