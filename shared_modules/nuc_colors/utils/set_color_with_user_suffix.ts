import { colorStorageSet } from 'nucleify'

export function setColorWithUserSuffix(key: string, value: string): void {
  const userKey = `${key}-u`

  colorStorageSet(userKey, value)

  if (typeof document !== 'undefined') {
    document.dispatchEvent(new Event('colorUpdated'))
  }
}
