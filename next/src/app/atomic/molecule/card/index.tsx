import { JSX } from 'react'
import Card from '@mui/material/Card'
import { AdCardProps } from './types'
import './AdCard.scss'

export default function AdCard({
  children,
  className = '',
  sx,
  ...rest
}: AdCardProps): JSX.Element {
  return (
    <Card className={`ad-card ${className}`} sx={sx} {...rest}>
      {children}
    </Card>
  )
}
