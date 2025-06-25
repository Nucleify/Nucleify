import Grid from '@mui/material/Grid'
import type { JSX } from 'react'

import type { AdGridInterface } from './types'

export default function AdGrid({
  children,
  ...rest
}: AdGridInterface): JSX.Element {
  return <Grid {...rest}>{children}</Grid>
}
