import { defaultColors } from '../constants/default'
import { colorKeys } from '../constants/keys'
import { colorShades } from '../constants/shades'

// TODO(nuc_stores): replace local storage/cookie helpers with atomic exports
// after nuc_stores is migrated to Next.
function localStorageGetItem(key: string): string {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(key) || ''
}

function cookieGetItem(key: string): string {
  if (typeof document === 'undefined') return ''
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${key}=`))
  return cookie ? decodeURIComponent(cookie.split('=')[1] || '') : ''
}

export function applyColorsWithSystemAndUser(): void {
  if (typeof document === 'undefined') return

  const cssVars: string[] = []

  colorKeys.forEach((item: string): void =>
    colorShades.forEach((state: string): void => {
      const baseKey = `${item}-${state}`
      const systemKey = `${baseKey}-s`
      const userKey = `${baseKey}-u`
      const systemValue =
        cookieGetItem(systemKey) ||
        localStorageGetItem(systemKey) ||
        defaultColors[baseKey] ||
        ''

      if (systemValue) {
        cssVars.push(`--${systemKey}: ${systemValue}`)
        cssVars.push(`--${baseKey}: ${systemValue}`)
      }

      const userValue =
        cookieGetItem(userKey) ||
        localStorageGetItem(userKey) ||
        systemValue ||
        ''

      if (userValue) {
        cssVars.push(`--${userKey}: ${userValue}`)
        cssVars.push(`--${baseKey}: ${userValue}`)
      }
    })
  )

  const style = document.createElement('style')

  style.id = 'nuc-color-vars'
  style.textContent = `:root { ${cssVars.join('; ')} }`

  const existingStyle = document.getElementById('nuc-color-vars')
  if (existingStyle) existingStyle.remove()
  document.head.appendChild(style)
}

if (typeof document !== 'undefined') {
  document.addEventListener('colorUpdated', applyColorsWithSystemAndUser)
}
