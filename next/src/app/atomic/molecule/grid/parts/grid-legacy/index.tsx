import GridLegacy from '@mui/material/GridLegacy'
import type { JSX } from 'react'

import type { AdGridLegacyInterface } from './types'

export default function AdGridLegacy({
  children,
  className,
  sx,
  ...rest
}: AdGridLegacyInterface): JSX.Element {
  return (
    <GridLegacy className={className} sx={sx} {...rest}>
      {children}
    </GridLegacy>
  )
}
