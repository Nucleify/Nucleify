import { navigateTo, removeUserFromSessionStorage } from 'atomic'

export function logout(): void {
  navigateTo(runtime.appUrl + 'logout')
  removeUserFromSessionStorage()
}
