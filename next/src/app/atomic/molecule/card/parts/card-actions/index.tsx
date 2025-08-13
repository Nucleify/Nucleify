import CardActions from '@mui/material/CardActions'
import type { JSX } from 'react'

import type { AdCardActionsInterface } from './types'

export default function AdCardActions(
  props: AdCardActionsInterface
): JSX.Element {
  return <CardActions {...props} />
}
