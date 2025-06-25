import CardMedia from '@mui/material/CardMedia'
import type { JSX } from 'react'

import type { AdCardMediaInterface } from './types'

export default function AdCardMedia(props: AdCardMediaInterface): JSX.Element {
  return <CardMedia {...props} />
}
