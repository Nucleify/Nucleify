import type { Session, User } from '@supabase/supabase-js'
import { getSupabaseClient } from '../../../shared_modules/nuc_api/supabase/client'

const DEFAULT_LANG = 'en'

export function useAdminAuth() {
  const user = useState<User | null>('admin-auth-user', () => null)
  const session = useState<Session | null>('admin-auth-session', () => null)
  const ready = useState<boolean>('admin-auth-ready', () => false)

  async function refreshSession(): Promise<Session | null> {
    const client = getSupabaseClient()
    const { data, error } = await client.auth.getSession()
    if (error) {
      user.value = null
      session.value = null
      ready.value = true
      return null
    }
    session.value = data.session
    user.value = data.session?.user ?? null
    ready.value = true
    return data.session
  }

  async function signIn(email: string, password: string): Promise<void> {
    const client = getSupabaseClient()
    const { data, error } = await client.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) throw error
    session.value = data.session
    user.value = data.user
    ready.value = true
  }

  async function signOut(): Promise<void> {
    const client = getSupabaseClient()
    await client.auth.signOut()
    session.value = null
    user.value = null
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
    refreshSession,
    signIn,
    signOut,
    langFromPath,
    loginPath,
    homePath,
    DEFAULT_LANG,
  }
}
