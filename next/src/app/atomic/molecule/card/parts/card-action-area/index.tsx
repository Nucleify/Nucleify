import { JSX } from 'react'

import { CardActionArea } from '@mui/material'
import { AdCardActionAreaProps } from './types'

export default function AdCardActionArea(
  props: AdCardActionAreaProps
): JSX.Element {
  return <CardActionArea {...props} />
}
