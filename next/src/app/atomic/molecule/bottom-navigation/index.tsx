import BottomNavigation from '@mui/material/BottomNavigation'
import type { JSX } from 'react'

import type { AdBottomNavigationInterface } from './types'

export default function AdBottomNavigation({
  children,
  className = '',
  sx,
  ...rest
}: AdBottomNavigationInterface): JSX.Element {
  return (
    <BottomNavigation
      className={`ad-bottom-navigation ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </BottomNavigation>
  )
}
