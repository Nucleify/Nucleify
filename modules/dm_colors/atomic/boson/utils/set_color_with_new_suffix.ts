import { cookieSetItem, localStorageSetItem } from 'atomic'

export function setColorWithNewSuffix(key: string, value: string): void {
  const newKey = `${key}-new`

  cookieSetItem(newKey, value)
  localStorageSetItem(newKey, value)

  if (import.meta.client) {
    document.documentElement.style.setProperty(`--${newKey}`, value)
  }
}
