import Grow from '@mui/material/Grow'
import type { JSX } from 'react'

import type { AdGrowInterface } from './types'

export default function AdGrow({
  children,
  ...rest
}: AdGrowInterface): JSX.Element {
  return <Grow {...rest}>{children}</Grow>
}
