'use client'

import type { JSX, PropsWithChildren } from 'react'

import type { ButtonInterface } from 'nucleify'
import { AdButton } from 'nucleify'

// import { NucAnimationHexagons } from 'nuc_animations/hexagons'
import styles from './index.module.scss'

export function NucHexagonsButton({
  children,
  className,
  ...restProps
}: PropsWithChildren<ButtonInterface>): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  return (
    <AdButton
      {...restProps}
      className={cx(styles['nuc-hexagons-button'], className)}
    >
      {children}
      {/* <NucAnimationHexagons
        containerClassName={styles['hexagon-rows-container']}
        rowClassName={styles['hexagon-row-container']}
      /> */}
    </AdButton>
  )
}
