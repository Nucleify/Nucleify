import { invalidateCookieCache } from 'nucleify'

export function cookieSetItem(
  name: string,
  value: string,
  days: number = 365
): void {
  if (typeof document !== 'undefined') {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
    invalidateCookieCache()
  }
}
