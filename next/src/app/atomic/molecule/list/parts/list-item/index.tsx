import { JSX } from 'react'

import ListItem from '@mui/material/ListItem'

import { AdListItemInterface } from './types/interfaces'

export default function AdListItem({
  children,
  className,
  sx,
  ...rest
}: AdListItemInterface): JSX.Element {
  return (
    <ListItem className={`ad-list-item ${className}`} sx={sx} {...rest}>
      {children}
    </ListItem>
  )
}
