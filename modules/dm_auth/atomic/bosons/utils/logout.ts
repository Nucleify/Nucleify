import { navigateTo, removeUserFromSessionStorage } from 'atomic'

export function logout(): void {
  navigateTo(appUrl() + '/logout')
  removeUserFromSessionStorage()
}
