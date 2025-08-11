import Container from '@mui/material/Container'
import type { JSX } from 'react'

import type { AdContainerInterface } from './types'

export default function AdContainer({
  className = '',
  sx,
  ...rest
}: AdContainerInterface): JSX.Element {
  return <Container className={`ad-container ${className}`} sx={sx} {...rest} />
}
