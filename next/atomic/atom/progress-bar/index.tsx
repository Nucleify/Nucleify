'use client'

import { ProgressBar } from 'primereact/progressbar'
import type { JSX } from 'react'

import type { ProgressBarInterface } from './types'

import { adTypePt, splitAdTypeProps } from '../../utils/ad_type'

export function AdProgressBar(props: ProgressBarInterface): JSX.Element {
  const { adType, rest } = splitAdTypeProps(props)
  const { width, height, style, ...primeProps } = rest
  const mergedStyle = {
    ...(style || {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  }

  return (
    <ProgressBar {...primeProps} style={mergedStyle} pt={adTypePt(adType)} />
  )
}
