'use client'

import { Divider } from 'primereact/divider'
import type { JSX } from 'react'

import type { DividerInterface } from './types'

import { nuiTypePt, splitNuiTypeProps } from '../../utils/nui_type'

export function AdDivider(props: DividerInterface): JSX.Element {
  const { nuiType, rest } = splitNuiTypeProps(props)
  return <Divider {...rest} pt={nuiTypePt(nuiType)} />
}
