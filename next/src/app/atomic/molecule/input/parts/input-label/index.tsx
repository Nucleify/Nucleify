import { JSX } from 'react'

import InputLabel from '@mui/material/InputLabel'

import { AdInputLabelInterface } from './types'

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
