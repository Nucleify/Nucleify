import InputAdornment from '@mui/material/InputAdornment'
import type { JSX } from 'react'

import type { AdInputAdornmentInterface } from './types'

export default function AdInputAdornment({
  className = '',
  sx,
  ...rest
}: AdInputAdornmentInterface): JSX.Element {
  return (
    <InputAdornment
      className={`ad-input-adornment ${className}`}
      sx={sx}
      {...rest}
    />
  )
}
