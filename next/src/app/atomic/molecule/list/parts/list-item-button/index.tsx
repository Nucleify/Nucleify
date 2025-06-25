import ListItemButton from '@mui/material/ListItemButton'
import type { JSX } from 'react'

import type { AdListItemButtonInterface } from './types/interfaces'

export default function AdListItemButton({
  children,
  className,
  ...rest
}: AdListItemButtonInterface): JSX.Element {
  return (
    <ListItemButton className={`ad-list-item-button ${className}`} {...rest}>
      {children}
    </ListItemButton>
  )
}
