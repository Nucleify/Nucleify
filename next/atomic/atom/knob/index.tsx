'use client'

import { Knob } from 'primereact/knob'
import type { JSX } from 'react'

import type { KnobInterface } from './types'

import { adTypePt, splitAdTypeProps } from '../../utils/ad_type'

export function AdKnob(props: KnobInterface): JSX.Element {
  const { adType, rest } = splitAdTypeProps(props)
  const { className, ...primeProps } = rest
  return <Knob {...primeProps} className={className} pt={adTypePt(adType)} />
}
