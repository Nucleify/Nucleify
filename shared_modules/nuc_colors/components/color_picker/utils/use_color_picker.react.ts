'use client'

import { persistItemColorShades, useColors } from 'nucleify'

import { useCallback, useEffect, useState } from 'react'

export function useColorPicker(item: string) {
  const { colors } = useColors()
  const primary = colors[item]?.primary
  const [itemColor, setItemColor] = useState(primary)

  useEffect(() => {
    setItemColor(primary)
  }, [primary])

  function onItemColorChange(value: string): void {
    setItemColor(value)
  }

  const setColorValues = useCallback(async (): Promise<void> => {
    if (!itemColor) return
    await persistItemColorShades(item, itemColor)
  }, [item, itemColor])

  return {
    itemColor,
    onItemColorChange,
    setColorValues,
  }
}
