import ButtonGroup from '@mui/material/ButtonGroup'
import type { JSX } from 'react'

import type { AdButtonGroupInterface } from './types'

export default function AdButtonGroup({
  children,
  className = '',
  sx,
  ...rest
}: AdButtonGroupInterface): JSX.Element {
  return (
    <ButtonGroup className={`ad-button-group ${className}`} sx={sx} {...rest}>
      {children}
    </ButtonGroup>
  )
}
