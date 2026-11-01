export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAdminAuth()
  const lang = auth.langFromPath(to.path)
  const isLogin = to.path === `/${lang}/login` || to.path.endsWith('/login')

  // Plugin hydrates session from Supabase auth cookies (SSR + client).
  // Only refresh on the client when the plugin has not marked ready yet.
  if (import.meta.client && !auth.ready.value) {
    try {
      await auth.refreshSession()
    } catch {
      auth.applySession(null)
    }
  }

  if (!auth.session.value && !isLogin) {
    return navigateTo(auth.loginPath(lang), { replace: true })
  }

  if (auth.session.value && isLogin) {
    return navigateTo(auth.homePath(lang), { replace: true })
  }

  if (import.meta.client) {
    // Reveal only after this navigation settles on an allowed page (redirects
    // skip this and the next middleware pass reveals instead).
    document.documentElement.setAttribute('data-auth-ready', '')
  }
})
