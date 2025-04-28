import { Ref, ref } from 'vue'
import {
  UseColorsInterface,
  UseColorPickerInterface,
  createColorTypes,
  useColors,
} from 'atomic'

export function useColorPicker(item: string): UseColorPickerInterface {
  const { colors }: UseColorsInterface = useColors()

  const itemColor: Ref<string> = ref(colors[item]?.primary || '#000000')

  function setColorValues(): void {
    const colorValue = itemColor.value?.startsWith('#')
      ? itemColor.value
      : `#${itemColor.value}`

    if (!colorValue) return

    const colorSettings = createColorTypes(colorValue)

    Object.entries(colorSettings).forEach(([key, value]) =>
      localStorage.setItem(`${item}-item${key ? `-${key}` : ''}-color`, value)
    )
  }

  return { itemColor, setColorValues }
}
