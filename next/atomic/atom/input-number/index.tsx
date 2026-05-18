import { InputNumber } from 'primereact/inputnumber'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { InputNumberInterface } from './types'

export function AdInputNumber({
  className = '',
  adType,
  ...rest
}: InputNumberInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-inputnumber'], className),
    },
    input: {
      root: {
        className: styles['ad-inputtext'],
        ...(adType ? { 'ad-type': adType } : {}),
      },
    },
  }

  return <InputNumber {...rest} pt={pt} />
}
