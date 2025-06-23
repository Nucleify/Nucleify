import { JSX } from 'react'

import Input from '@mui/material/Input'

import { AdInputInterface } from './types'

export default function AdInput({
  className = '',
  sx,
  ...rest
}: AdInputInterface): JSX.Element {
  return <Input className={`ad-input ${className}`} sx={sx} {...rest} />
}
