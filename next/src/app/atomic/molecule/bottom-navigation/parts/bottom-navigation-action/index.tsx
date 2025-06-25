import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import type { JSX } from 'react'

import type { AdBottomNavigationActionInterface } from './types'

export default function AdBottomNavigationAction({
  className = '',
  sx,
  ...rest
}: AdBottomNavigationActionInterface): JSX.Element {
  return (
    <BottomNavigationAction
      className={`ad-bottom-navigation-action ${className}`}
      sx={sx}
      {...rest}
    />
  )
}
