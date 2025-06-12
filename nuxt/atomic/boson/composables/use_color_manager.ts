import {
  colorKeys,
  colorTypes,
  cookieGetItem,
  cookieSetItem,
  localStorageGetItem,
  localStorageSetItem,
} from 'atomic'

export function useColorManager() {
  // Apply colors from cookies immediately (prevents flashing)
  const applyColorsFromCookies = () => {
    if (import.meta.client) {
      colorKeys.forEach((item: string): void =>
        colorTypes.forEach((state: string): void => {
          const key = `${item}-item-${state}`
          const value = cookieGetItem(key)

          if (value) {
            document.documentElement.style.setProperty(`--${key}`, value)
          }
        })
      )
    }
  }

  // Get color value with fallback priority: cookie > localStorage > default
  const getColorValue = (key: string, defaultValue: string = ''): string => {
    return cookieGetItem(key) || localStorageGetItem(key) || defaultValue
  }

  // Set color value in both cookie and localStorage
  const setColorValue = (key: string, value: string): void => {
    cookieSetItem(key, value)
    localStorageSetItem(key, value)

    // Apply immediately to prevent flashing
    if (import.meta.client) {
      document.documentElement.style.setProperty(`--${key}`, value)
    }
  }

  // Sync localStorage colors to cookies (for migration)
  const syncLocalStorageToCookies = (): void => {
    if (import.meta.client) {
      colorKeys.forEach((item: string): void =>
        colorTypes.forEach((state: string): void => {
          const key = `${item}-item-${state}`
          const localStorageValue = localStorageGetItem(key)
          const cookieValue = cookieGetItem(key)

          // If localStorage has value but cookie doesn't, sync it
          if (localStorageValue && !cookieValue) {
            cookieSetItem(key, localStorageValue)
          }
        })
      )
    }
  }

  return {
    applyColorsFromCookies,
    getColorValue,
    setColorValue,
    syncLocalStorageToCookies,
  }
}
