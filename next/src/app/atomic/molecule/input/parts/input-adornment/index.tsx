import { JSX } from 'react'

import InputAdornment from '@mui/material/InputAdornment'

import { AdInputAdornmentInterface } from './types'

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
