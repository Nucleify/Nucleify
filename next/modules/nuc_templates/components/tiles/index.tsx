'use client'

import type { JSX } from 'react'

import { AdTile, type NucTilesInterface } from 'nucleify'

import styles from './index.module.scss'

export function NucTiles({ entities }: NucTilesInterface): JSX.Element {
  return (
    <div className={styles['nuc-tiles']}>
      {entities.map((entity, index) => (
        <AdTile key={index} {...entity} />
      ))}
    </div>
  )
}
