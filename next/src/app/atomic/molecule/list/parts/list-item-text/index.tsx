import ListItemText from '@mui/material/ListItemText'
import type { JSX } from 'react'

import type { AdListItemTextInterface } from './types/interfaces'

export default function AdListItemText({
  children,
  className,
  sx,
  ...rest
}: AdListItemTextInterface): JSX.Element {
  return (
    <ListItemText
      className={`ad-list-item-text ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </ListItemText>
  )
}
