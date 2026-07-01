import { ColorPicker } from 'primereact/colorpicker'
import type { JSX } from 'react'

import type { ColorPickerInterface } from './types'

export function AdColorPicker({
  className = '',
  nuiType,
  ...rest
}: ColorPickerInterface): JSX.Element {
  const mergedClassName = ['ad-colorpicker', className]
    .filter(Boolean)
    .join(' ')

  return (
    <ColorPicker
      {...rest}
      className={mergedClassName || undefined}
      {...(nuiType ? { 'nui-type': nuiType } : {})}
    />
  )
}
