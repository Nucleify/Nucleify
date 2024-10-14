import {
  IsAdminFunctionType,
  UserIdType,
  UserRequestsInterface,
  UserRoleType,
} from 'atomic/bosons/types'
import { userRequests, setUserToSessionStorage } from 'atomic/bosons/utils'

export async function isAdmin(): IsAdminFunctionType {
  const { results, getUser }: UserRequestsInterface = userRequests()
  const userId: UserIdType = window.sessionStorage.getItem('user_id')

  if (!userId) {
    await getUser()
    setUserToSessionStorage(results.value)
  }

  const userRole: UserRoleType = window.sessionStorage.getItem('user_role')

  return ['admin', 'test_admin', 'super_admin'].includes(userRole)
}
