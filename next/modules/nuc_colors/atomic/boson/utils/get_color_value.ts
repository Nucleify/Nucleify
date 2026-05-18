import { defaultColors } from '../constants/default'

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

export function getColorValue(key: string): string {
  return (
    cookieGetItem(key) || localStorageGetItem(key) || defaultColors[key] || ''
  )
}
