import { Calendar } from 'primereact/calendar'
import type { JSX } from 'react'
import { useMemo } from 'react'

import styles from './index.module.scss'
import type { DatePickerInterface } from './types'

import { parseDateValue } from './utils/parse_date_value'

export function AdDatePicker({
  className,
  adType,
  panelClassName,
  showOnFocus = true,
  value,
  ...rest
}: DatePickerInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const resolvedPanelClassName = panelClassName ?? adType
  const panelType = resolvedPanelClassName
  const parsedValue = useMemo(() => parseDateValue(value), [value])

  const pt = {
    root: {
      className: cx(styles['ad-datepicker'], className),
      style: { width: '100%' },
      ...(adType ? { 'ad-type': adType } : {}),
    },
    input: {
      root: {
        className: styles['ad-inputtext'],
        style: { width: '100%' },
        ...(adType ? { 'ad-type': adType } : {}),
      },
    },
    ...(panelType
      ? {
          panel: {
            className: panelType,
            'ad-type': panelType,
          },
        }
      : {}),
  }

  return (
    <Calendar
      {...rest}
      value={parsedValue}
      showOnFocus={showOnFocus}
      panelClassName={resolvedPanelClassName}
      pt={pt}
    />
  )
}
