'use client'

import type { JSX } from 'react'

import styles from './index.module.scss'

export function NucGridBackground({
  className,
}: {
  className?: string
}): JSX.Element {
  return (
    <div className={className}>
      <div className={styles['nuc-grid-background-grid']}></div>
      <div className={styles['nuc-grid-background-glow']}></div>
    </div>
  )
}
