import InputLabel from '@mui/material/InputLabel'
import type { JSX } from 'react'

import type { AdInputLabelInterface } from './types'

export default function AdInputLabel({
  children,
  className = '',
  sx,
  ...rest
}: AdInputLabelInterface): JSX.Element {
  return (
    <InputLabel className={`ad-input-label ${className}`} sx={sx} {...rest}>
      {children}
    </InputLabel>
  )
}
