import Link from '@mui/material/Link'
import type { JSX } from 'react'

import type { AdLinkInterface } from './types/interfaces'

export default function AdLink({
  children,
  className,
  sx,
  ...rest
}: AdLinkInterface): JSX.Element {
  return (
    <Link className={`ad-link ${className}`} sx={sx} {...rest}>
      {children}
    </Link>
  )
}
