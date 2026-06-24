'use client'

import { ProgressSpinner } from 'primereact/progressspinner'
import type { JSX } from 'react'

import type { ProgressSpinnerInterface } from './types'

import { adTypePt, splitAdTypeProps } from '../../utils/ad_type'

export function AdProgressSpinner(
  props: ProgressSpinnerInterface
): JSX.Element {
  const { adType, rest } = splitAdTypeProps(props)
  const { width, height, style, ...primeProps } = rest
  const mergedStyle = {
    ...(style || {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  }

  return (
    <ProgressSpinner
      {...primeProps}
      style={mergedStyle}
      pt={adTypePt(adType)}
    />
  )
}
