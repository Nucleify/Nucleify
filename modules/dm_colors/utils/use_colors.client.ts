// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  colorKeys,
  colorTypes,
  ColorItemColorsInterface,
  UseColorsInterface,
  isCurrentUrl,
} from 'atomic'

export function useColors(): UseColorsInterface {
  if (process.client) {
    const documentStyle = getComputedStyle(document.documentElement)

    const getItemColors = (key: string): ColorItemColorsInterface => ({
      primary: localStorage.getItem(`${key}-item-color`) || '',
      hover: localStorage.getItem(`${key}-item-hover-color`) || '',
      secondary: localStorage.getItem(`${key}-item-secondary-color`) || '',
    })

    const colors = Object.fromEntries(
      colorKeys.map((key) => [key, getItemColors(key)])
    )

    function setDefaultColors(initial: boolean): void {
      colorKeys.forEach((key) => {
        colorTypes.forEach((type) => {
          const property = `${key}-item-${type}`
          const value = documentStyle.getPropertyValue(`--${property}`).trim()

          if (initial && !localStorage.getItem(property)) {
            localStorage.setItem(property, value)
          } else if (!initial) {
            localStorage.setItem(property, value)
            if (isCurrentUrl('/settings')) location.reload()
          }
        })
      })
    }

    return { colors, setDefaultColors }
  }
}
