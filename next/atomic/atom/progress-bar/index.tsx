'use client'

import { ProgressBar } from 'primereact/progressbar'
import type { JSX } from 'react'

import type { ProgressBarInterface } from './types'

import { nuiTypePt, splitNuiTypeProps } from '../../utils/nui_type'

export function AdProgressBar(props: ProgressBarInterface): JSX.Element {
  const { nuiType, rest } = splitNuiTypeProps(props)
  const { width, height, style, ...primeProps } = rest
  const mergedStyle = {
    ...(style || {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  }

  return (
    <ProgressBar {...primeProps} style={mergedStyle} pt={nuiTypePt(nuiType)} />
  )
}
