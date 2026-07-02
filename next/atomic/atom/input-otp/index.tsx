import { InputOtp } from 'primereact/inputotp'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { InputOtpInterface } from './types'

export function AdInputOtp({
  className = '',
  nuiType,
  ...rest
}: InputOtpInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-inputotp'], className),
    },
    input: {
      root: {
        className: styles['ad-inputtext'],
        ...(nuiType ? { 'nui-type': nuiType } : {}),
      },
    },
  }

  return <InputOtp {...rest} pt={pt} />
}
