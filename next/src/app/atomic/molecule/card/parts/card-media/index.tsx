import { JSX } from 'react'

import CardMedia from '@mui/material/CardMedia'

import { AdCardMediaInterface } from './types'

export default function AdCardMedia(props: AdCardMediaInterface): JSX.Element {
  return <CardMedia {...props} />
}
