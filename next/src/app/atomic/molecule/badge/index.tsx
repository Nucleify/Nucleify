import { JSX } from 'react'

import Badge from '@mui/material/Badge'

import { AdBadgeInterface } from './types'

export default function AdBadge({
  children,
  className = '',
  sx,
  ...rest
}: AdBadgeInterface): JSX.Element {
  return (
    <Badge className={`ad-badge ${className}`} sx={sx} {...rest}>
      {children}
    </Badge>
  )
}
