import { JSX } from 'react'

import { ButtonBase } from '@mui/material'

import { AdButtonBaseInterface } from './types'

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
