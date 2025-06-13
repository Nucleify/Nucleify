import { JSX } from 'react'

import Card from '@mui/material/Card'

import { AdCardInterface } from './types'

export default function AdCard({
  children,
  className = '',
  sx,
  ...rest
}: AdCardInterface): JSX.Element {
  return (
    <Card className={`ad-card ${className}`} sx={sx} {...rest}>
      {children}
    </Card>
  )
}
