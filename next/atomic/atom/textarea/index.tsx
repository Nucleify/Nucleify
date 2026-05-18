'use client'

import { InputTextarea } from 'primereact/inputtextarea'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { TextareaInterface } from './types'

export function AdTextarea({
  className = '',
  adType,
  ...rest
}: TextareaInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-textarea'], className),
      ...(adType ? { 'ad-type': adType } : {}),
    },
  }

  return <InputTextarea {...rest} pt={pt} />
}
