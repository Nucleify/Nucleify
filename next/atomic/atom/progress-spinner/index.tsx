'use client'

import { ProgressSpinner } from 'primereact/progressspinner'
import type { JSX } from 'react'

import type { ProgressSpinnerInterface } from './types'

import { nuiTypePt, splitNuiTypeProps } from '../../utils/nui_type'

export function AdProgressSpinner(
  props: ProgressSpinnerInterface
): JSX.Element {
  const { nuiType, rest } = splitNuiTypeProps(props)
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
      pt={nuiTypePt(nuiType)}
    />
  )
}
