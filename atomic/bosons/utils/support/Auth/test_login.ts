import axios from 'axios'

import { UserInterface } from 'atomic/bosons/types'
import { navigateTo } from 'atomic/bosons/utils'

export async function testLogin(role: string): Promise<void> {
  const credentials: UserInterface = {
    user: { email: 'test_user@datamanager.com', password: 'test_user123' },
    admin: {
      email: 'test_admin@datamanager.com',
      password: 'test_admin123',
    },
  }

  const userCredentials = credentials[role]

  if (!userCredentials) {
    console.error('Invalid role:', role)
    return
  }

  try {
    await axios.post('/login', userCredentials)
    navigateTo('/dashboard')
  } catch (error) {
    console.error('Error during login:', error)
  }
}
