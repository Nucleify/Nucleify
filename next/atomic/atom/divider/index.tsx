'use client'

import { Divider } from 'primereact/divider'
import type { JSX } from 'react'

import type { DividerInterface } from './types'

import { adTypePt, splitAdTypeProps } from '../../utils/ad_type'

export function AdDivider(props: DividerInterface): JSX.Element {
  const { adType, rest } = splitAdTypeProps(props)
  return <Divider {...rest} pt={adTypePt(adType)} />
}
