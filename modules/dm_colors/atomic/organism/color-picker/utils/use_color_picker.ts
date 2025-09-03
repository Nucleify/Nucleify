import type { Ref } from 'vue'
import { ref } from 'vue'

import type { UseColorPickerInterface, UseColorsInterface } from 'atomic'
import { createColorShades, setColorWithNewSuffix, useColors } from 'atomic'

export function useColorPicker(item: string): UseColorPickerInterface {
  const { colors }: UseColorsInterface = useColors()

  const itemColor: Ref<string> = ref(colors[item]?.primary || '#000000')

  function setColorValues(): void {
    const colorValue = itemColor.value?.startsWith('#')
      ? itemColor.value
      : `#${itemColor.value}`

    if (!colorValue) return

    const colorSettings = createColorShades(colorValue)

    Object.entries(colorSettings).forEach(([key, value]) => {
      const colorKey = `${item}-item${key ? `-${key}` : ''}-color`
      setColorWithNewSuffix(colorKey, value)
    })
  }

  return { itemColor, setColorValues }
}
