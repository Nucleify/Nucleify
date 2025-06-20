import { JSX } from 'react'

import Grid from '@mui/material/Grid'

import { AdGridInterface } from './types'

export default function AdGrid({
  children,
  ...rest
}: AdGridInterface): JSX.Element {
  return <Grid {...rest}>{children}</Grid>
}
