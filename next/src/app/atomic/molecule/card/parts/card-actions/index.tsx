import { JSX } from 'react'

import { CardActions } from '@mui/material'
import { AdCardActionsProps } from './types'

export default function AdCardActions(props: AdCardActionsProps): JSX.Element {
  return <CardActions {...props} />
}
