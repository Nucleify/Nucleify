import {
  applyColorsWithSystemAndUser,
  colorKeys,
  colorShades,
  colorStorageGet,
  colorStorageSet,
  ensureFrameworkColorStorage,
} from 'nucleify'

export function colorsClientPlugin(): void {
  if (typeof document === 'undefined') return

  ensureFrameworkColorStorage()

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

  colorKeys.forEach((item: string) =>
    colorShades.forEach((state: string) => {
      const baseKey = `${item}-${state}`
      const systemKey = `${baseKey}-s`
      const userKey = `${baseKey}-u`

      const systemLocalStorageValue = colorStorageGet(systemKey)
      if (systemLocalStorageValue) {
        colorStorageSet(systemKey, systemLocalStorageValue)
      }

      const userLocalStorageValue = colorStorageGet(userKey)
      if (userLocalStorageValue) {
        colorStorageSet(userKey, userLocalStorageValue)
      } else if (!colorStorageGet(userKey)) {
        const systemValue = colorStorageGet(systemKey)
        if (systemValue) {
          colorStorageSet(userKey, systemValue)
        }
      }

      document.addEventListener(`colorUpdated:${systemKey}`, () => {
        const value = colorStorageGet(systemKey)
        if (value) {
          colorStorageSet(systemKey, value)
        }
        applyColorsWithSystemAndUser()
      })

      document.addEventListener(`colorUpdated:${userKey}`, () => {
        const value = colorStorageGet(userKey)
        if (value) {
          colorStorageSet(userKey, value)
        }
        applyColorsWithSystemAndUser()
      })
    })
  )
}
