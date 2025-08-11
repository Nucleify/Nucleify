import CardContent from '@mui/material/CardContent'
import type { JSX } from 'react'

import type { AdCardContentInterface } from './types'

export default function AdCardContent({
  children,
  className = '',
  sx,
  ...rest
}: AdCardContentInterface): JSX.Element {
  return (
    <CardContent className={`ad-card-content ${className}`} sx={sx} {...rest}>
      {children}
    </CardContent>
  )
}
