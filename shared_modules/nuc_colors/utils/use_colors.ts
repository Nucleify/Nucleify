import type { ColorItemInterface, UseColorsInterface } from 'nucleify'
import { colorKeys, getColorValue } from 'nucleify'

export function useColors(): UseColorsInterface {
  const getItemColors = (key: string): ColorItemInterface => {
    const primary = getColorValue(`${key}-c-u`) || getColorValue(`${key}-c-s`)
    const hover = getColorValue(`${key}-hv-u`) || getColorValue(`${key}-hv-s`)
    const secondary =
      getColorValue(`${key}-sc-u`) || getColorValue(`${key}-sc-s`)

    return { primary, hover, secondary }
  }

  const colors = Object.fromEntries(
    colorKeys.map((key) => [key, getItemColors(key)])
  )

  return {
    colors,
  }
}
