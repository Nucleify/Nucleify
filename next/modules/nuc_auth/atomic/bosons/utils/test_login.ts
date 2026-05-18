import type { LoginFieldsInterface, UserRoleType } from 'nucleify'
import { apiRequest, getAndSetUser, syncColorsWithDatabase } from 'nucleify'

export async function testLogin(role: UserRoleType): Promise<void> {
  const credentials: Record<UserRoleType, LoginFieldsInterface | undefined> = {
    user: { email: 'test_user@nucleify.io', password: 'test_user123' },
    admin: { email: 'test_admin@nucleify.io', password: 'test_admin123' },
    tech: { email: 'test_tech@nucleify.io', password: 'test_tech123' },
    test_user: undefined,
    test_admin: undefined,
    test_tech: undefined,
    super_admin: undefined,
    demo: undefined,
  }

  const userCredentials = credentials[role]

  if (!userCredentials) {
    console.error('Invalid role:', role)
    return
  }

  await apiRequest('/login', 'POST', userCredentials)
  await getAndSetUser()
  await syncColorsWithDatabase()
}
