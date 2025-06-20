import { JSX } from 'react'

import Grow from '@mui/material/Grow'

import { AdGrowInterface } from './types'

export default function AdGrow({
  children,
  ...rest
}: AdGrowInterface): JSX.Element {
  return <Grow {...rest}>{children}</Grow>
}
