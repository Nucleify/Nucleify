'use client'

import type { JSX } from 'react'

import { AdIcon } from 'nucleify'

import styles from './index.module.scss'

export interface TrustBadgeItemInterface {
  icon: string
  label: string
}

interface TrustBadgesInterface {
  items?: TrustBadgeItemInterface[]
}

export function NucTrustBadges({ items }: TrustBadgesInterface): JSX.Element {
  return (
    <div className={styles['nuc-trust-badges']}>
      {items?.map((item, index) => (
        <div
          key={`${item.icon}-${item.label}-${index}`}
          className={styles['nuc-trust-badge-item']}
        >
          <AdIcon icon={item.icon} className={styles['iconify']} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
