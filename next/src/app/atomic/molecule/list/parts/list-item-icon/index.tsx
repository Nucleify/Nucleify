import ListItemIcon from '@mui/material/ListItemIcon'
import type { JSX } from 'react'

import type { AdListItemIconInterface } from './types/interfaces'

export default function AdListItemIcon({
  children,
  className,
  sx,
}: AdListItemIconInterface): JSX.Element {
  return (
    <ListItemIcon className={`ad-list-item-icon ${className}`} sx={sx}>
      {children}
    </ListItemIcon>
  )
}
