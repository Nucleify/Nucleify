import { applyColorsWithSystemAndUser, colorKeys, colorShades } from 'nucleify'

function localStorageGetItem(key: string): string {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(key) || ''
}

function localStorageSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, value)
}

function cookieGetItem(key: string): string {
  if (typeof document === 'undefined') return ''
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${key}=`))
  return cookie ? decodeURIComponent(cookie.split('=')[1] || '') : ''
}

function cookieSetItem(key: string, value: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; SameSite=Lax`
}

export function colorsClientPlugin(): void {
  if (typeof document === 'undefined') return

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      applyColorsWithSystemAndUser,
      {
        once: true,
      }
    )
  } else {
    applyColorsWithSystemAndUser()
  }

  colorKeys.forEach((item: string): void =>
    colorShades.forEach((state: string): void => {
      const baseKey = `${item}-${state}`
      const systemKey = `${baseKey}-s`
      const userKey = `${baseKey}-u`

      const systemLocalStorageValue = localStorageGetItem(systemKey)
      const systemCookieValue = cookieGetItem(systemKey)

      if (systemLocalStorageValue && !systemCookieValue) {
        cookieSetItem(systemKey, systemLocalStorageValue)
      }

      const userLocalStorageValue = localStorageGetItem(userKey)
      const userCookieValue = cookieGetItem(userKey)

      if (userLocalStorageValue && !userCookieValue) {
        cookieSetItem(userKey, userLocalStorageValue)
      } else if (!userLocalStorageValue && !userCookieValue) {
        const systemValue = systemLocalStorageValue || systemCookieValue
        if (systemValue) {
          cookieSetItem(userKey, systemValue)
          localStorageSetItem(userKey, systemValue)
        }
      }
    })
  )
}
