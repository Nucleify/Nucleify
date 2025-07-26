import { defineNuxtPlugin } from 'nuxt/app'

import {
  applyColorsWithNewSuffix,
  colorKeys,
  colorTypes,
  cookieGetItem,
  cookieSetItem,
  localStorageGetItem,
} from 'atomic'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    applyColorsWithNewSuffix()

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyColorsWithNewSuffix)
    }

    colorKeys.forEach((item: string): void =>
      colorTypes.forEach((state: string): void => {
        const key = `${item}-item-${state}`
        const localStorageValue = localStorageGetItem(key)
        const cookieValue = cookieGetItem(key)

        if (localStorageValue && !cookieValue) {
          cookieSetItem(key, localStorageValue)
        }
      })
    )
  }
})
