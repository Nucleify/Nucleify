import InputBase from '@mui/material/InputBase'
import type { JSX } from 'react'

import type { AdInputBaseInterface } from './types'

export default function AdInputBase({
  className = '',
  sx,
  ...rest
}: AdInputBaseInterface): JSX.Element {
  return (
    <InputBase className={`ad-input-base ${className}`} sx={sx} {...rest} />
  )
}
