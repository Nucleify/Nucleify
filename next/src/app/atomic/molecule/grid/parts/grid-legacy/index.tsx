import { JSX } from 'react'

import GridLegacy from '@mui/material/GridLegacy'

import { AdGridLegacyInterface } from './types'

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
