import { UserIdType, UserRequestsInterface } from 'atomic/bosons/types'
import { userRequests, setUserToSessionStorage } from 'atomic/bosons/utils'

export async function isAdmin(): Promise<boolean> {
  const { results, getUser }: UserRequestsInterface = userRequests()
  const userId: UserIdType = window.sessionStorage.getItem('user_id')
  const userRole: string = window.sessionStorage.getItem('user_role')!

  if (!userId || !userRole) {
    await getUser()
    setUserToSessionStorage(results.value)
  }

  return ['admin', 'test_admin', 'super_admin'].includes(userRole)
}
