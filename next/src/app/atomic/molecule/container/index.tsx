import { JSX } from 'react'

import Container from '@mui/material/Container'

import { AdContainerInterface } from './types'

export default function AdContainer({
  className = '',
  sx,
  ...rest
}: AdContainerInterface): JSX.Element {
  return <Container className={`ad-container ${className}`} sx={sx} {...rest} />
}
