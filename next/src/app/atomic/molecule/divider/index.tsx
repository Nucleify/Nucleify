import Divider from '@mui/material/Divider'
import type { JSX } from 'react'

import type { AdDividerInterface } from './types'

export default function AdDivider({
  children,
  className = '',
  sx,
  ...rest
}: AdDividerInterface): JSX.Element {
  return (
    <Divider className={`ad-divider ${className}`} sx={sx} {...rest}>
      {children}
    </Divider>
  )
}
