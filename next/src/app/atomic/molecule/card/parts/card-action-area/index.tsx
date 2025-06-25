import CardActionArea from '@mui/material/CardActionArea'
import type { JSX } from 'react'

import type { AdCardActionAreaInterface } from './types'

export default function AdCardActionArea(
  props: AdCardActionAreaInterface
): JSX.Element {
  return <CardActionArea {...props} />
}
