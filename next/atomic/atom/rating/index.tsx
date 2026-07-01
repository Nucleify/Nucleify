'use client'

import { Rating } from 'primereact/rating'
import type { JSX } from 'react'

import type { RatingInterface } from './types'

import { nuiTypePt, splitNuiTypeProps } from '../../utils/nui_type'

export function AdRating(props: RatingInterface): JSX.Element {
  const { nuiType, rest } = splitNuiTypeProps(props)
  return <Rating {...rest} pt={nuiTypePt(nuiType)} />
}
