import type { Session, User } from '@supabase/supabase-js'
import { getSupabaseClient } from '@shared_modules'

const DEFAULT_LANG = 'en'

export function useAdminAuth() {
  const user = useState<User | null>('admin-auth-user', () => null)
  const session = useState<Session | null>('admin-auth-session', () => null)
  const ready = useState<boolean>('admin-auth-ready', () => false)

  function applySession(next: Session | null): void {
    session.value = next
    user.value = next?.user ?? null
    ready.value = true
  }

  async function refreshSession(): Promise<Session | null> {
    const client = getSupabaseClient()
    const { data, error } = await client.auth.getSession()
    if (error) {
      applySession(null)
      return null
    }
    applySession(data.session)
    return data.session
  }

  async function signIn(email: string, password: string): Promise<void> {
    const client = getSupabaseClient()
    const { data, error } = await client.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) throw error
    applySession(data.session)
  }

  async function signOut(): Promise<void> {
    const client = getSupabaseClient()
    await client.auth.signOut()
    applySession(null)
  }

  function langFromPath(path: string): string {
    const match = path.match(/^\/([a-z]{2})(?:\/|$)/)
    return match?.[1] || DEFAULT_LANG
  }

  function loginPath(lang = DEFAULT_LANG): string {
    return `/${lang}/login`
  }

  function homePath(lang = DEFAULT_LANG): string {
    return `/${lang}`
  }

  return {
    user,
    session,
    ready,
    applySession,
    refreshSession,
    signIn,
    signOut,
    langFromPath,
    loginPath,
    homePath,
    DEFAULT_LANG,
  }
}
