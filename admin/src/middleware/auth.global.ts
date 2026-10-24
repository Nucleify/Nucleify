export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAdminAuth()
  if (!auth.ready.value) {
    await auth.refreshSession()
  }

  const lang = auth.langFromPath(to.path)
  const isLogin = to.path === `/${lang}/login` || to.path.endsWith('/login')

  if (!auth.session.value && !isLogin) {
    return navigateTo(auth.loginPath(lang))
  }

  if (auth.session.value && isLogin) {
    return navigateTo(auth.homePath(lang))
  }
})
