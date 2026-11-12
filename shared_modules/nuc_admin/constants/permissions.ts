export const ADMIN_PERMISSIONS = [
  'users.read',
  'users.write',
  'cms.read',
  'cms.write',
  'cms.publish',
  'cms.pages.publish',
  'cms.posts.edit',
  'cms.posts.publish',
  'cms.comments.moderate',
  'cms.contact.read',
  'media.read',
  'media.write',
  'settings.write',
  'roles.write',
] as const

export type AdminPermissionSlug = (typeof ADMIN_PERMISSIONS)[number]

export const ADMIN_ROLE_SLUGS = ['owner', 'admin', 'editor'] as const

export type AdminRoleSlug = (typeof ADMIN_ROLE_SLUGS)[number]
