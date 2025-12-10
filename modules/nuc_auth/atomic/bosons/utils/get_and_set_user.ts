// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { UserRequestsInterface } from 'atomic'
import { setUserToSessionStorage, userRequests } from 'atomic'

export async function getAndSetUser(): Promise<void> {
  const { results, getUser }: UserRequestsInterface = userRequests()

  await getUser()

  setUserToSessionStorage(results.value)
}
