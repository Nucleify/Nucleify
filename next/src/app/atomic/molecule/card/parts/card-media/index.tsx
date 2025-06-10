import { JSX } from 'react'

import { CardMedia } from '@mui/material'
import { AdCardMediaInterface } from './types'

export default function AdCardMedia(props: AdCardMediaInterface): JSX.Element {
  return <CardMedia {...props} />
}
