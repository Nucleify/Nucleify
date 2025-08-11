import Breadcrumbs from '@mui/material/Breadcrumbs'
import type { JSX } from 'react'

import type { AdBreadcrumbsInterface } from './types'

export default function AdBreadcrumbs({
  children,
  className = '',
  sx,
  ...rest
}: AdBreadcrumbsInterface): JSX.Element {
  return (
    <Breadcrumbs className={`ad-breadcrumbs ${className}`} sx={sx} {...rest}>
      {children}
    </Breadcrumbs>
  )
}
