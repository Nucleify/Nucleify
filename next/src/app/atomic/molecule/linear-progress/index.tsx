import { JSX } from 'react'

import LinearProgress from '@mui/material/LinearProgress'

import { AdLinearProgressInterface } from './types'

export default function AdLinearProgress({
  className = '',
  sx,
  ...rest
}: AdLinearProgressInterface): JSX.Element {
  return <LinearProgress className={className} sx={sx} {...rest} />
}
