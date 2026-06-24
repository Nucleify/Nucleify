'use client'

import { Toast } from 'primereact/toast'
import { forwardRef, useCallback } from 'react'

import styles from './index.module.scss'
import type { AdToastProps } from './types'

import { setToastInstance } from './utils/use_atomic_toast'

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
      icon: {
        className: styles['ad-toast-message-icon'],
      },
    }

    const registerToast = useCallback(
      (instance: Toast | null) => {
        setToastInstance(instance)

        if (typeof ref === 'function') {
          ref(instance)
        } else if (ref) {
          ref.current = instance
        }
      },
      [ref]
    )

    return <Toast ref={registerToast} {...rest} pt={pt} />
  }
)
