'use client'

import { Menu } from 'primereact/menu'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import styles from './index.module.scss'
import type { MenuInterface } from './types'
export interface AdMenuRef {
  toggle: (event: React.MouseEvent) => void
}

export const AdMenu = forwardRef<AdMenuRef, MenuInterface>(
  ({ className, ...rest }, ref) => {
    const menuRef = useRef<Menu>(null)

    useImperativeHandle(ref, () => ({
      toggle: (event: React.MouseEvent) => {
        menuRef.current?.toggle(event)
      },
    }))

    const cx = (...classes: (string | undefined | null | false)[]) =>
      classes.filter(Boolean).join(' ')

    const pt = {
      root: {
        className: cx(styles['ad-menu'], className),
      },
      menu: {
        className: styles['ad-menu-list'],
      },
      menuitem: {
        className: styles['ad-menu-item'],
      },
      content: {
        className: styles['ad-menu-item-content'],
      },
      action: {
        className: styles['ad-menu-item-link'],
      },
    }

    return <Menu ref={menuRef} {...rest} popup pt={pt} />
  }
)
