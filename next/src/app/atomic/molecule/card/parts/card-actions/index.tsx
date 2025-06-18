import { JSX } from 'react'

import CardActions from '@mui/material/CardActions'

import { AdCardActionsInterface } from './types'

export default function AdCardActions(
  props: AdCardActionsInterface
): JSX.Element {
  return <CardActions {...props} />
}
