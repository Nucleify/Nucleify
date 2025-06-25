import ButtonBase from '@mui/material/ButtonBase'
import type { JSX } from 'react'

import type { AdButtonBaseInterface } from './types'

export default function AdButtonBase({
  children,
  className = '',
  sx,
  ...rest
}: AdButtonBaseInterface): JSX.Element {
  return (
    <ButtonBase className={`ad-button-base ${className}`} sx={sx} {...rest}>
      {children}
    </ButtonBase>
  )
}
