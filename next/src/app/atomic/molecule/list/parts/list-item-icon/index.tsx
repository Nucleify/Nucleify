import { JSX } from 'react'

import ListItemIcon from '@mui/material/ListItemIcon'

import { AdListItemIconInterface } from './types/interfaces'

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
