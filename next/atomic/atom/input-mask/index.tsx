import { InputMask } from 'primereact/inputmask'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { InputMaskInterface } from './types'

export function AdInputMask({
  className = '',
  adType,
  ...rest
}: InputMaskInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-inputmask'], className),
      ...(adType ? { 'ad-type': adType } : {}),
    },
  }

  return <InputMask {...rest} pt={pt} />
}
