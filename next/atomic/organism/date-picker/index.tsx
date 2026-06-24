import { Calendar } from 'primereact/calendar'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { DatePickerInterface } from './types'

export function AdDatePicker({
  className,
  adType,
  showOnFocus = true,
  ...rest
}: DatePickerInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-datepicker'], className),
    },
    input: {
      root: {
        className: styles['ad-inputtext'],
        ...(adType ? { 'data-ad-type': adType } : {}),
      },
    },
  }

  return <Calendar {...rest} showOnFocus={showOnFocus} pt={pt} />
}
