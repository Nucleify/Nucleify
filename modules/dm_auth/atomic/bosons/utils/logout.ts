import { navigateToUrl, removeUserFromSessionStorage } from 'atomic'

export function logout(): void {
  navigateToUrl(appUrl() + '/logout')
  removeUserFromSessionStorage()
}
