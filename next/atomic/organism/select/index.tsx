'use client'

import { Dropdown } from 'primereact/dropdown'
import { type JSX, useEffect, useState } from 'react'

import styles from './index.module.scss'

import type { SelectInterface } from './types/interfaces'

function useAppendTarget(
  appendTo: SelectInterface['appendTo']
): HTMLElement | undefined {
  const [target, setTarget] = useState<HTMLElement | undefined>(undefined)

  useEffect(() => {
    if (appendTo === null) {
      setTarget(undefined)
      return
    }

    if (appendTo === undefined || appendTo === 'body') {
      setTarget(document.body)
      return
    }

    if (typeof appendTo === 'string') {
      setTarget(document.querySelector(appendTo) as HTMLElement | undefined)
      return
    }

    setTarget(appendTo)
  }, [appendTo])

  return target
}

export function AdSelect({
  className,
  adType,
  appendTo,
  ...rest
}: SelectInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const appendTarget = useAppendTarget(appendTo ?? 'body')

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

  return <Dropdown {...rest} appendTo={appendTarget} pt={pt} />
}
