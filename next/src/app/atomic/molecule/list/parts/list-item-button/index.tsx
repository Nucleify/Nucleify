import { JSX } from 'react'

import ListItemButton from '@mui/material/ListItemButton'

import { AdListItemButtonInterface } from './types/interfaces'

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
