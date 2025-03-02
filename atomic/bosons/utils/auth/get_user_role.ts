// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  UserIdType,
  UserRequestsInterface,
  userRequests,
  setUserToSessionStorage,
} from 'atomic'

export async function getUserRole(): Promise<{
  isAdmin: () => boolean
  isStaff: () => boolean
}> {
  const { results, getUser }: UserRequestsInterface = userRequests()
  const userId: UserIdType = window.sessionStorage.getItem('user_id')

  if (!userId) {
    await getUser()
    setUserToSessionStorage(results.value)
  }

  const userRole: string = window.sessionStorage.getItem('user_role')!

  const isAdmin: () => boolean = () => {
    return ['admin', 'test_admin', 'super_admin'].includes(userRole)
  }

  const isStaff: () => boolean = () => {
    return ['tech', 'test_admin', 'admin', 'super_admin'].includes(userRole)
  }

  return { isAdmin, isStaff }
}
