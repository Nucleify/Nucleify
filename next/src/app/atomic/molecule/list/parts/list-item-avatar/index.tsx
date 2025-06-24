import { JSX } from 'react'

import ListItemAvatar from '@mui/material/ListItemAvatar'

import { AdListItemAvatarInterface } from './types/interfaces'

export default function AdListItemAvatar({
  children,
  className,
  sx,
  ...rest
}: AdListItemAvatarInterface): JSX.Element {
  return (
    <ListItemAvatar
      className={`ad-list-item-avatar ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </ListItemAvatar>
  )
}
