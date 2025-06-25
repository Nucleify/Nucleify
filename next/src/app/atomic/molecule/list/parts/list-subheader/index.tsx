import ListSubheader from '@mui/material/ListSubheader'
import type { JSX } from 'react'

import type { AdListSubheaderInterface } from './types/interfaces'

export default function AdListSubheader({
  children,
  className = '',
  sx,
  ...rest
}: AdListSubheaderInterface): JSX.Element {
  return (
    <ListSubheader
      className={`ad-list-subheader ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </ListSubheader>
  )
}
