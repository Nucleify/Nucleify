'use client'

import { Dropdown } from 'primereact/dropdown'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { SelectInterface } from './types/interfaces'

export function AdSelect({
  className,
  adType,
  ...rest
}: SelectInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-select'], className),
      ...(adType ? { 'ad-type': adType } : {}),
    },
    input: {
      className: styles['ad-select-label'],
    },
    trigger: {
      className: styles['ad-select-dropdown'],
    },
    panel: {
      className: styles['ad-select-overlay'],
      ...(adType ? { 'ad-type': adType } : {}),
    },
    wrapper: {
      className: styles['ad-select-list-container'],
    },
    list: {
      className: styles['ad-select-list'],
    },
    item: {
      className: styles['ad-select-option'],
    },
  }

  return <Dropdown {...rest} pt={pt} />
}
