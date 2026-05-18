'use client'

import type { JSX } from 'react'

import { AdIcon, type NucShinyBadgeInterface } from 'nucleify'

import styles from './index.module.scss'

export function NucShinyBadge({
  icon,
  label,
}: NucShinyBadgeInterface): JSX.Element {
  return (
    <span className={styles['nuc-shiny-badge']}>
      <AdIcon icon={icon} className={styles['iconify']} />
      <span>{label}</span>
    </span>
  )
}
