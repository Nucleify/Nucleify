'use client'

import { RadioButton } from 'primereact/radiobutton'
import type { JSX } from 'react'

import type { RadioButtonInterface } from './types'

import { nuiTypePt, splitNuiTypeProps } from '../../utils/nui_type'

export function AdRadioButton(props: RadioButtonInterface): JSX.Element {
  const { nuiType, rest } = splitNuiTypeProps(props)
  return <RadioButton {...rest} pt={nuiTypePt(nuiType)} />
}
