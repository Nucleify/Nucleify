import FilledInput from '@mui/material/FilledInput'
import type { JSX } from 'react'

import type { AdFilledInputInterface } from './types'

export default function AdFilledInput({
  className = '',
  sx,
  ...rest
}: AdFilledInputInterface): JSX.Element {
  return (
    <FilledInput className={`ad-filled-input ${className}`} sx={sx} {...rest} />
  )
}
