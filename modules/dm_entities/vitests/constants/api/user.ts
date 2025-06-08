import type { UserObjectInterface } from 'atomic'

export const mockUser: UserObjectInterface = {
  id: 999999,
  name: 'Example',
  email: 'example@data-manager.com',
  role: 'admin',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  email_verified_at: new Date().toISOString(),
}
