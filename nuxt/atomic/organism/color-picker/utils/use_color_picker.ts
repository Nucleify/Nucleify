import type { Ref } from 'vue'
import { ref } from 'vue'

import type { UseColorsInterface, UseColorPickerInterface } from 'atomic'
import { createColorTypes, useColors, setColorWithNewSuffix } from 'atomic'

export function useColorPicker(item: string): UseColorPickerInterface {
  const { colors }: UseColorsInterface = useColors()

  const itemColor: Ref<string> = ref(colors[item]?.primary || '#000000')

  function setColorValues(): void {
    const colorValue = itemColor.value?.startsWith('#')
      ? itemColor.value
      : `#${itemColor.value}`

    if (!colorValue) return

    const colorSettings = createColorTypes(colorValue)

    Object.entries(colorSettings).forEach(([key, value]) => {
      const colorKey = `${item}-item${key ? `-${key}` : ''}-color`
      setColorWithNewSuffix(colorKey, value)
    })
  }

  return { itemColor, setColorValues }
}
