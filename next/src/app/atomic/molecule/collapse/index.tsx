import Collapse from '@mui/material/Collapse'
import type { JSX } from 'react'

import type { AdCollapseInterface } from './types'

export default function AdCollapse({
  children,
  className = '',
  sx,
  ...rest
}: AdCollapseInterface): JSX.Element {
  return (
    <Collapse className={`ad-collapse ${className}`} sx={sx} {...rest}>
      {children}
    </Collapse>
  )
}
