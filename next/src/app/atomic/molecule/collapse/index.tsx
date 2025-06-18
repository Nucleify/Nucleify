import { JSX } from 'react'

import Collapse from '@mui/material/Collapse'

import { AdCollapseInterface } from './types'

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
