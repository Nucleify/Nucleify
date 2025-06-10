import { JSX } from 'react'

import { CardActionArea } from '@mui/material'
import { AdCardActionAreaInterface } from './types'

export default function AdCardActionArea(
  props: AdCardActionAreaInterface
): JSX.Element {
  return <CardActionArea {...props} />
}
