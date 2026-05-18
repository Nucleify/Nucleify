import { Rating } from 'primereact/rating'
import type { JSX } from 'react'

import type { RatingInterface } from './types'

export function AdRating(props: RatingInterface): JSX.Element {
  return <Rating {...props} />
}
