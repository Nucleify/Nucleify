import Chip from '@mui/material/Chip'
import type { JSX } from 'react'

import type { AdChipInterface } from './types'

export default function AdChip({
  className = '',
  sx,
  ...rest
}: AdChipInterface): JSX.Element {
  return <Chip className={`ad-chip ${className}`} sx={sx} {...rest} />
}
