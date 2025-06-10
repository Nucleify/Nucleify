import { JSX } from 'react'
import { CardContent } from '@mui/material'
import { AdCardContentInterface } from './types'

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
