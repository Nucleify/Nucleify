'use client'

import { Card } from 'primereact/card'
import type { JSX, ReactNode } from 'react'

import styles from './index.module.scss'

import type { CardInterface } from './types/interfaces'

export function AdCard({
  className = '',
  children,
  header,
  title,
  ...rest
}: CardInterface & { header?: ReactNode; title?: ReactNode }): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: { className: cx(styles['ad-card'], className) },
    body: { className: styles['ad-card-body'] },
    content: { className: cx(styles['ad-card-content'], 'p-card-content') },
  }

  return (
    <Card {...rest} pt={pt} header={header} title={title}>
      {children}
    </Card>
  )
}
