import { ref } from 'vue'

import { persistItemColorShades, useColors } from 'nucleify'

export function useColorPicker(item: string) {
  const { colors } = useColors()
  const itemColor = ref(colors[item]?.primary)

  async function setColorValues(): Promise<void> {
    const value = itemColor.value
    if (!value) return
    await persistItemColorShades(item, value)
  }

  return {
    itemColor,
    setColorValues,
  }
}
