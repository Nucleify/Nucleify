'use client'

import { Knob } from 'primereact/knob'
import type { JSX } from 'react'

import type { KnobInterface } from './types'

import { nuiTypePt, splitNuiTypeProps } from '../../utils/nui_type'

export function AdKnob(props: KnobInterface): JSX.Element {
  const { nuiType, rest } = splitNuiTypeProps(props)
  const { className, ...primeProps } = rest
  return <Knob {...primeProps} className={className} pt={nuiTypePt(nuiType)} />
}
