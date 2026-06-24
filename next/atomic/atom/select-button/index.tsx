'use client'

import { SelectButton } from 'primereact/selectbutton'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { SelectButtonInterface } from './types'

export function AdSelectButton({
  className = '',
  adType,
  ...rest
}: SelectButtonInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(className),
    },
    button: {
      className: styles['ad-togglebutton'],
      ...(adType ? { 'ad-type': adType } : {}),
    },
  }

  return <SelectButton {...rest} pt={pt} />
}
