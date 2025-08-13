import { cookieGetItem, defaultColors, localStorageGetItem } from 'atomic'

export function getColorValue(key: string): string {
  return (
    cookieGetItem(key) || localStorageGetItem(key) || defaultColors[key] || ''
  )
}
