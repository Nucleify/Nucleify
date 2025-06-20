import { JSX } from 'react'

import FilledInput from '@mui/material/FilledInput'

import { AdFilledInputInterface } from './types'

export default function AdFilledInput({
  className = '',
  sx,
  ...rest
}: AdFilledInputInterface): JSX.Element {
  return (
    <FilledInput className={`ad-filled-input ${className}`} sx={sx} {...rest} />
  )
}
