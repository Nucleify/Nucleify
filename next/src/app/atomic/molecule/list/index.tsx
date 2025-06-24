import { JSX } from 'react'

import List from '@mui/material/List'

import { AdListInterface } from './types'

export default function AdList({
  children,
  className,
  sx,
  ...rest
}: AdListInterface): JSX.Element {
  return (
    <List className={`ad-list ${className}`} sx={sx} {...rest}>
      {children}
    </List>
  )
}
