'use client'

import { RadioButton } from 'primereact/radiobutton'
import type { JSX } from 'react'

import type { RadioButtonInterface } from './types'

import { adTypePt, splitAdTypeProps } from '../../utils/ad_type'

export function AdRadioButton(props: RadioButtonInterface): JSX.Element {
  const { adType, rest } = splitAdTypeProps(props)
  return <RadioButton {...rest} pt={adTypePt(adType)} />
}
