import ImageList from '@mui/material/ImageList'
import type { JSX } from 'react'

import type { AdImageListInterface } from './types'

export default function AdImageList({
  children,
  className,
  sx,
  ...rest
}: AdImageListInterface): JSX.Element {
  return (
    <ImageList className={`ad-image-list ${className}`} sx={sx} {...rest}>
      {children}
    </ImageList>
  )
}
