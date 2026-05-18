'use client'

import { Dialog } from 'primereact/dialog'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { DialogInterface } from './types'

export function AdDialog({
  className,
  modal = true,
  showHeader = true,
  header,
  footer,
  children,
  ...rest
}: DialogInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-dialog'], className),
    },
    header: {
      className: styles['ad-dialog-header'],
      style: { background: 'transparent' },
    },
    content: {
      className: styles['ad-dialog-content'],
      style: { background: 'transparent' },
    },
    footer: {
      className: styles['ad-dialog-footer'],
      style: { background: 'transparent' },
    },

    mask: {
      className: styles['ad-dialog-mask'],
    },
    closeButton: {
      className: styles['ad-dialog-header-icon'],
    },
  }

  return (
    <Dialog
      {...rest}
      modal={modal}
      showHeader={showHeader}
      header={header}
      footer={footer}
      pt={pt}
    >
      {children}
    </Dialog>
  )
}
