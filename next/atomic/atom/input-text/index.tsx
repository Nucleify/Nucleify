import { InputText } from 'primereact/inputtext'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { InputTextInterface } from './types'

export function AdInputText({
  className = '',
  adType,
  invalid,
  ...rest
}: InputTextInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-inputtext'], invalid && 'p-invalid', className),
      ...(adType ? { 'ad-type': adType } : {}),
    },
  }

  return <InputText {...rest} invalid={invalid} pt={pt} />
}
