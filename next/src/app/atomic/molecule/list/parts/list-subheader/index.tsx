import { JSX } from 'react'

import ListSubheader from '@mui/material/ListSubheader'

import { AdListSubheaderInterface } from './types/interfaces'

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
