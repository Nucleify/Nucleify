import { JSX } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { AdCircularProgressInterface } from './types'

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
