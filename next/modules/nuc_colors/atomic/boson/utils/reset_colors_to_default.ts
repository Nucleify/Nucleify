import { defaultColors } from '../constants/default'
import { colorKeys } from '../constants/keys'
import { colorShades } from '../constants/shades'
import { applyColorsWithSystemAndUser } from './apply_colors_with_system_and_user'

// TODO(nuc_stores): replace local storage/cookie helpers with atomic exports
// after nuc_stores is migrated to Next.
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

export function resetColorsToDefault(): void {
  if (typeof document === 'undefined') return

  console.log('🔄 Resetting all colors to default values...')
  colorKeys.forEach((item: string): void =>
    colorShades.forEach((state: string): void => {
      const key = `${item}-${state}`
      const systemKey = `${key}-s`
      const userKey = `${key}-u`
      const systemValue =
        cookieGetItem(systemKey) ||
        localStorageGetItem(systemKey) ||
        defaultColors[key]

      if (systemValue) {
        cookieSetItem(userKey, systemValue)
        localStorageSetItem(userKey, systemValue)

        console.log(`✅ Reset: ${userKey} = ${systemValue}`)
      }
    })
  )

  applyColorsWithSystemAndUser()

  const event = new Event('colorUpdated')
  document.dispatchEvent(event)

  console.log('🎉 All colors reset to default values!')
}
