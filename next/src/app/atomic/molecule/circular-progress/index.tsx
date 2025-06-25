import CircularProgress from '@mui/material/CircularProgress'
import type { JSX } from 'react'

import type { AdCircularProgressInterface } from './types'

export default function AdCircularProgress({
  className = '',
  sx,
  ...rest
}: AdCircularProgressInterface): JSX.Element {
  return (
    <CircularProgress
      className={`ad-circular-progress ${className}`}
      sx={sx}
      {...rest}
    />
  )
}
