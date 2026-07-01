import { InputMask } from 'primereact/inputmask'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { InputMaskInterface } from './types'

export function AdInputMask({
  className = '',
  nuiType,
  ...rest
}: InputMaskInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-inputmask'], className),
      ...(nuiType ? { 'nui-type': nuiType } : {}),
    },
  }

  return <InputMask {...rest} pt={pt} />
}
