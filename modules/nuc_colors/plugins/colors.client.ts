import { defineNuxtPlugin } from 'nuxt/app'

import {
  applyColorsWithNewSuffix,
  colorKeys,
  colorShades,
  cookieGetItem,
  cookieSetItem,
  localStorageGetItem,
} from 'atomic'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyColorsWithNewSuffix, {
        once: true,
      })
    } else {
      applyColorsWithNewSuffix()
    }

    colorKeys.forEach((item: string): void =>
      colorShades.forEach((state: string): void => {
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
