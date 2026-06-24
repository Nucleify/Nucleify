'use client'

import { Rating } from 'primereact/rating'
import type { JSX } from 'react'

import type { RatingInterface } from './types'

import { adTypePt, splitAdTypeProps } from '../../utils/ad_type'

export function AdRating(props: RatingInterface): JSX.Element {
  const { adType, rest } = splitAdTypeProps(props)
  return <Rating {...rest} pt={adTypePt(adType)} />
}
