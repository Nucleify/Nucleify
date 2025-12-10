import type { LoginFieldsInterface, UserRoleType } from 'atomic'
import { apiHandle, getAndSetUser } from 'atomic'

export async function testLogin(role: UserRoleType): Promise<void> {
  const credentials: Record<UserRoleType, LoginFieldsInterface | undefined> = {
    user: { email: 'test_user@nucleify.io', password: 'test_user123' },
    admin: { email: 'test_admin@nucleify.io', password: 'test_admin123' },
    test_user: { email: '', password: '' },
    test_admin: { email: '', password: '' },
    test_tech: { email: '', password: '' },
    super_admin: { email: '', password: '' },
  }

  const userCredentials = credentials[role]

  if (!userCredentials) {
    console.error('Invalid role:', role)
    return
  }

  await apiHandle({
    url: appUrl() + '/login',
    method: 'POST',
    data: userCredentials,
    onSuccess: async (): Promise<void> => {
      await getAndSetUser()
    },
  })
}
