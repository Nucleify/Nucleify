import {
  apiRequest,
  getAndSetUser,
  getCurrentLang,
  navigateToUrl,
  syncColorsWithDatabase,
} from 'nucleify'

export async function demoLogin(): Promise<void> {
  const lang = getCurrentLang()

  await apiRequest('/demo/session', 'POST')
  await getAndSetUser()
  await syncColorsWithDatabase()
  navigateToUrl(`/${lang}/entities`)
}
