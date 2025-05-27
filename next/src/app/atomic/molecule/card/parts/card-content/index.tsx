import { JSX } from 'react'

import { CardContent } from '@mui/material'
import { AdCardContentProps } from './types'

export default function AdCardContent(props: AdCardContentProps): JSX.Element {
  return <CardContent {...props} />
}
