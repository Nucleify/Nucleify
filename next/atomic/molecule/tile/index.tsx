'use client'
import Link from 'next/link'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { TileInterface } from './types'

import { AdIcon } from '../../atom/icon'
import { AdParagraph } from '../../atom/paragraph'

export function AdTile({
  nuiType,
  header,
  href = '#',
  count,
  countSecondary,
  textSecondary,
  icon,
}: TileInterface): JSX.Element {
  return (
    <Link href={href} data-nui-type={nuiType} className={styles['ad-tile']}>
      <div className={styles['general']}>
        <div className={styles['info']}>
          <div className={styles['header']}>
            <AdParagraph text={header} />
          </div>

          <div className={styles['count']}>
            <AdParagraph text={count !== undefined ? String(count) : ''} />
          </div>
        </div>

        <div className={styles['icon-container']}>
          <AdIcon className={styles['icon']} icon={icon} nuiType={nuiType} />
        </div>
      </div>

      <div className={styles['secondary']}>
        <div className={styles['count']}>
          <AdParagraph
            text={countSecondary !== undefined ? `${countSecondary} new` : ''}
          />
        </div>
        <div className={styles['text']}>
          <AdParagraph text={textSecondary} />
        </div>
      </div>
    </Link>
  )
}
