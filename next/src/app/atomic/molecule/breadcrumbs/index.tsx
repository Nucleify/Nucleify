import { JSX } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs'

import { AdBreadcrumbsInterface } from './types'

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
