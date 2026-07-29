import { describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'
import { useColors } from 'nucleify'

describe('useColors', (): void => {
  it('should return an object with all color keys and their colors', (): void => {
    const result = useColors()

    nucleify.colorKeys.forEach((key: string): void => {
      expect(result.colors).toHaveProperty(key)

      const itemColors = result.colors[key]

      expect(itemColors).toHaveProperty('primary')
      expect(itemColors).toHaveProperty('hover')
      expect(itemColors).toHaveProperty('secondary')

      expect(itemColors.primary).toBe(
        nucleify.getColorValue(`${key}-c-u`) ||
          nucleify.getColorValue(`${key}-c-s`)
      )
      expect(itemColors.hover).toBe(
        nucleify.getColorValue(`${key}-hv-u`) ||
          nucleify.getColorValue(`${key}-hv-s`)
      )
      expect(itemColors.secondary).toBe(
        nucleify.getColorValue(`${key}-sc-u`) ||
          nucleify.getColorValue(`${key}-sc-s`)
      )
    })
  })
})
