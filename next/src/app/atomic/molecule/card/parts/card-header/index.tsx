import { JSX } from 'react'

import { CardHeader } from '@mui/material'
import { AdCardHeaderProps } from './types'

export default function AdCardHeader(props: AdCardHeaderProps): JSX.Element {
  return <CardHeader {...props} />
}
