import { JSX } from 'react'

import { CardMedia } from '@mui/material'
import { AdCardMediaProps } from './types'

export default function AdCardMedia(props: AdCardMediaProps): JSX.Element {
  return <CardMedia {...props} />
}
