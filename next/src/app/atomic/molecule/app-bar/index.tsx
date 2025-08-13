import AppBar from '@mui/material/AppBar'
import type { JSX } from 'react'

import type { AdAppBarInterface } from './types'

export default function AdAppBar({
  children,
  className = '',
  sx,
  ...rest
}: AdAppBarInterface): JSX.Element {
  return (
    <AppBar className={`ad-app-bar ${className}`} sx={sx} {...rest}>
      {children}
    </AppBar>
  )
}
