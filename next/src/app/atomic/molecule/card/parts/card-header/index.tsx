import CardHeader from '@mui/material/CardHeader'
import type { JSX } from 'react'

import type { AdCardHeaderInterface } from './types'

export default function AdCardHeader(
  props: AdCardHeaderInterface
): JSX.Element {
  return <CardHeader {...props} />
}
