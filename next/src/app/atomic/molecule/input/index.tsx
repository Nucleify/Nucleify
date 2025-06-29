import Input from '@mui/material/Input'
import type { JSX } from 'react'

import type { AdInputInterface } from './types'

export default function AdInput({
  className = '',
  sx,
  ...rest
}: AdInputInterface): JSX.Element {
  return <Input className={`ad-input ${className}`} sx={sx} {...rest} />
}
