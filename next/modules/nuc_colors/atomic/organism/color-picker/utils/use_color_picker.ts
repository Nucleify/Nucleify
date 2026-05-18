import { useEffect, useState } from 'react'

import type { UseColorsInterface } from '../../../boson/types/interfaces'
import { applyColorsWithSystemAndUser } from '../../../boson/utils/apply_colors_with_system_and_user'
import { createColorShades } from '../../../boson/utils/create_color_shades'
import { setColorWithUserSuffix } from '../../../boson/utils/set_color_with_user_suffix'
import { updateUserColorInDatabase } from '../../../boson/utils/update_user_colors_in_database'
import { useColors } from '../../../boson/utils/use_colors.client'
import type { UseColorPickerInterface } from '../types/interfaces'

const shadeMap: Record<string, string> = {
  '': 'c',
  dark: 'd',
  hover: 'hv',
  focus: 'f',
  highlight: 'h',
  secondary: 'sc',
  selected: 'sl',
}

export function useColorPicker(item: string): UseColorPickerInterface {
  const { colors }: UseColorsInterface = useColors()

  const [itemColor, setItemColor] = useState<string>(
    colors[item]?.primary || '#000000'
  )

  useEffect(() => {
    if (typeof document === 'undefined') return

    function updateItemColor(): void {
      const userKey = `--${item}-c-u`
      const computedStyle = getComputedStyle(document.documentElement)
      const newColor =
        computedStyle.getPropertyValue(userKey).trim() || '#000000'

      if (itemColor !== newColor) {
        setItemColor(newColor)
      }
    }

    document.addEventListener('colorUpdated', updateItemColor)

    return () => {
      document.removeEventListener('colorUpdated', updateItemColor)
    }
  }, [item, itemColor])

  async function setColorValues(): Promise<void> {
    const colorValue = itemColor?.startsWith('#') ? itemColor : `#${itemColor}`
    if (!colorValue) return

    const colorSettings = createColorShades(colorValue)

    const updatePromises: Promise<void>[] = []

    Object.entries(colorSettings).forEach(([key, value]) => {
      const shade = shadeMap[key] ?? 'c'
      const colorKey = `${item}-${shade}`
      setColorWithUserSuffix(colorKey, value)

      const userKey = `${colorKey}-u`
      updatePromises.push(updateUserColorInDatabase(userKey, value))
    })

    applyColorsWithSystemAndUser()

    await Promise.all(updatePromises)
  }

  function onItemColorChange(value: string): void {
    setItemColor(value)
  }

  return { itemColor, onItemColorChange, setColorValues }
}
