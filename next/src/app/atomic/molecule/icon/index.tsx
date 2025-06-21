import { JSX } from 'react'

import Icon from '@mui/material/Icon'

import { AdIconInterface } from './types'

export default function AdIcon({
  children,
  className,
  sx,
  ...rest
}: AdIconInterface): JSX.Element {
  return (
    <Icon className={`ad-icon ${className || ''}`} sx={sx} {...rest}>
      {children}
    </Icon>
  )
}
