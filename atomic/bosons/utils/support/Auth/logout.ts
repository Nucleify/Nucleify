import { navigateTo, removeUserFromSessionStorage } from 'atomic/bosons/utils'

export function logout(): void {
  navigateTo('/logout')
  removeUserFromSessionStorage()
}
