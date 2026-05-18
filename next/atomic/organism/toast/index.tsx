'use client'

import { Toast } from 'primereact/toast'
import { forwardRef, type JSX } from 'react'

import styles from './index.module.scss'
import type { AdToastProps } from './types'

export const AdToast = forwardRef<Toast, AdToastProps>(
  ({ className, ...rest }, ref) => {
    const cx = (...classes: (string | undefined | null | false)[]) =>
      classes.filter(Boolean).join(' ')

    const pt = {
      root: {
        className: cx(styles['ad-toast'], className),
      },
      message: {
        className: styles['ad-toast-message'],
      },
      content: {
        className: styles['ad-toast-message-content'],
      },
      summary: {
        className: styles['ad-toast-summary'],
      },
      closeButton: {
        className: styles['ad-toast-close-button'],
      },
    }

    return <Toast ref={ref} {...rest} pt={pt} />
  }
)
