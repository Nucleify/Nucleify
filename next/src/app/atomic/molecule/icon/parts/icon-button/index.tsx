import IconButton from '@mui/material/IconButton'
import type { JSX } from 'react'

import type { AdIconButtonInterface } from './types'

export default function AdIconButton({
  children,
  className,
  sx,
  ...rest
}: AdIconButtonInterface): JSX.Element {
  return (
    <IconButton
      className={`ad-icon-button ${className || ''}`}
      sx={sx}
      {...rest}
    >
      {children}
    </IconButton>
  )
}
