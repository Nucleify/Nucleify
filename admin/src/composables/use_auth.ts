import type { Session, User } from '@supabase/supabase-js'
import { getSupabaseClient } from '@shared_modules'

const DEFAULT_LANG = 'en'

export function useAuth() {
  const user = useState<User | null>('admin-auth-user', () => null)
  const session = useState<Session | null>('admin-auth-session', () => null)
  const ready = useState<boolean>('admin-auth-ready', () => false)

  const applySession = (next: Session | null): void => {
    session.value = next
    user.value = next?.user ?? null
    ready.value = true
  }

  const auth = () => getSupabaseClient().auth

  const refreshSession = async (): Promise<Session | null> => {
    const { data, error } = await auth().getSession()
    applySession(error ? null : data.session)
    return error ? null : data.session
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    const { data, error } = await auth().signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) throw error
    applySession(data.session)
  }

  const signOut = async (): Promise<void> => {
    await auth().signOut()
    applySession(null)
  }

  const langFromPath = (path: string): string =>
    path.match(/^\/([a-z]{2})(?:\/|$)/)?.[1] || DEFAULT_LANG
  const loginPath = (lang = DEFAULT_LANG): string => `/${lang}/login`
  const homePath = (lang = DEFAULT_LANG): string => `/${lang}`

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

export const useAdminAuth = useAuth
