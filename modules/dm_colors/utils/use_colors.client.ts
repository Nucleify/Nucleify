// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  colorKeys,
  colorTypes,
  ColorItemColorsInterface,
  UseColorsInterface,
  isCurrentUrl,
  localStorageGetItem,
  localStorageSetItem,
} from 'atomic'

export function useColors(): UseColorsInterface {
  const getItemColors = (key: string): ColorItemColorsInterface => ({
    primary: localStorageGetItem(`${key}-item-color`) || '',
    hover: localStorageGetItem(`${key}-item-hover-color`) || '',
    secondary: localStorageGetItem(`${key}-item-secondary-color`) || '',
  })

  const colors = Object.fromEntries(
    colorKeys.map((key) => [key, getItemColors(key)])
  )

  function setDefaultColors(initial?: boolean): void {
    if (process.client) {
      colorKeys.forEach((key) =>
        colorTypes.forEach((type) => {
          const property = `${key}-item-${type}`
          const value = getComputedStyle(document.documentElement)
            .getPropertyValue(`--${property}`)
            .trim()

          if ((initial && !localStorageGetItem(property)) || !initial) {
            localStorageSetItem(property, value)
            if (!initial && isCurrentUrl('/settings')) location.reload()
          }
        })
      )
    }
  }

  return { colors, setDefaultColors }
}
