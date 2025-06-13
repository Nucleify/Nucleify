import { JSX } from 'react'

import { CardHeader } from '@mui/material'

import { AdCardHeaderInterface } from './types'

export default function AdCardHeader(
  props: AdCardHeaderInterface
): JSX.Element {
  return <CardHeader {...props} />
}
