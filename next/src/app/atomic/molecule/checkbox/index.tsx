import Checkbox from '@mui/material/Checkbox'
import type { JSX } from 'react'

import type { AdCheckboxInterface } from './types'

export default function AdCheckbox({
  className = '',
  sx,
  ...rest
}: AdCheckboxInterface): JSX.Element {
  return <Checkbox className={`ad-checkbox ${className}`} sx={sx} {...rest} />
}
