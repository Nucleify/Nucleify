import type { ColorItemInterface, UseColorsInterface } from 'atomic'
import { colorKeys, getColorValue } from 'atomic'

export function useColors(): UseColorsInterface {
  const getItemColors = (key: string): ColorItemInterface => {
    const primary =
      getColorValue(`${key}-item-color-new`) ||
      getColorValue(`${key}-item-color`)
    const hover =
      getColorValue(`${key}-item-hover-color-new`) ||
      getColorValue(`${key}-item-hover-color`)
    const secondary =
      getColorValue(`${key}-item-secondary-color-new`) ||
      getColorValue(`${key}-item-secondary-color`)

    return { primary, hover, secondary }
  }

  const colors = Object.fromEntries(
    colorKeys.map((key) => [key, getItemColors(key)])
  )

  return {
    colors,
  }
}
