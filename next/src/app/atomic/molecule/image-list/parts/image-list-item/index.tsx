import ImageListItem from '@mui/material/ImageListItem'
import type { JSX } from 'react'

import type { AdImageListItemInterface } from './types/interfaces'

export default function AdImageListItem({
  children,
  className,
  sx,
  ...rest
}: AdImageListItemInterface): JSX.Element {
  return (
    <ImageListItem
      className={`ad-image-list-item ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </ImageListItem>
  )
}
