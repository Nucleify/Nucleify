import {
  applyColorsWithSystemAndUser,
  clearUserColorsCache,
  colorKeys,
  colorShades,
  colorStorageGet,
  colorStorageSet,
  defaultColors,
  updateAllUserColorsInDatabase,
} from 'nucleify'

export async function resetColorsToDefault(): Promise<void> {
  if (typeof window === 'undefined') return

  colorKeys.forEach((item: string): void =>
    colorShades.forEach((state: string): void => {
      const key = `${item}-${state}`
      const systemKey = `${key}-s`
      const userKey = `${key}-u`
      const systemValue = colorStorageGet(systemKey) || defaultColors[key] || ''

      if (systemValue) {
        colorStorageSet(userKey, systemValue)
      }
    })
  )

  applyColorsWithSystemAndUser()
  document.dispatchEvent(new Event('colorUpdated'))

  clearUserColorsCache()
  await updateAllUserColorsInDatabase()
}
