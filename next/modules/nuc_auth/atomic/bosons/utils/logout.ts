import {
  apiRequest,
  getCurrentLang,
  navigateToUrl,
  removeUserFromSessionStorage,
} from 'nucleify'

export async function logout(): Promise<void> {
  const lang = getCurrentLang()

  await apiRequest('/logout', 'POST')
  removeUserFromSessionStorage()
  navigateToUrl(`/${lang}/login`)
}
