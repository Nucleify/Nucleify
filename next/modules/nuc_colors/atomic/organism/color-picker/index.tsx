'use client'

import type { JSX } from 'react'
import { useEffect } from 'react'

import { AdColorPicker } from '../../../../../atomic/organism/color-picker'
import type { NucColorPickerInterface } from './types/interfaces'
import { useColorPicker } from './utils/use_color_picker'

export function NucColorPicker(props: NucColorPickerInterface): JSX.Element {
  const { itemColor, onItemColorChange, setColorValues } = useColorPicker(
    String(props.adType || '')
  )

  useEffect(() => {
    void setColorValues()
  }, [itemColor])

  return (
    <AdColorPicker
      {...props}
      value={itemColor}
      onChange={(event) => {
        const value = typeof event.value === 'string' ? event.value : ''
        onItemColorChange(value)
      }}
    />
  )
}
