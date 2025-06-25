import Drawer from '@mui/material/Drawer'
import type { JSX } from 'react'

import type { AdDrawerInterface } from './types'

export default function AdDrawer({
  children,
  className = '',
  ...rest
}: AdDrawerInterface): JSX.Element {
  return (
    <Drawer className={`ad-drawer ${className}`} {...rest}>
      {children}
    </Drawer>
  )
}
