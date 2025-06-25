import List from '@mui/material/List'
import type { JSX } from 'react'

import type { AdListInterface } from './types'

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
