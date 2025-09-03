import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import type { JSX } from 'react'

import type { AdListItemSecondaryActionInterface } from './types/interfaces'

export default function AdListItemSecondaryAction({
  children,
  className,
  sx,
}: AdListItemSecondaryActionInterface): JSX.Element {
  return (
    <ListItemSecondaryAction
      className={`ad-list-item-secondary-action ${className}`}
      sx={sx}
    >
      {children}
    </ListItemSecondaryAction>
  )
}
