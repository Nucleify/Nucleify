import ImageListItemBar from '@mui/material/ImageListItemBar'
import type { JSX } from 'react'

import type { AdImageListItemBarInterface } from './types/interfaces'

export default function AdImageListItemBar({
  className = '',
  sx,
  ...rest
}: AdImageListItemBarInterface): JSX.Element {
  return (
    <ImageListItemBar
      className={`ad-image-list-item-bar ${className}`}
      sx={sx}
      {...rest}
    ></ImageListItemBar>
  )
}
