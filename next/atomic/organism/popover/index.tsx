'use client'

import { OverlayPanel } from 'primereact/overlaypanel'
import type { JSX } from 'react'
import { useRef } from 'react'

import { AdButton } from '../../atom/button'
import styles from './index.module.scss'
import type { PopoverInterface } from './types'

export function AdPopover(props: PopoverInterface): JSX.Element {
  const {
    className,
    children,
    position,
    src,
    buttonClass,
    buttonStyle,
    buttonText,
    popoverClass,
    icon,
    ...rest
  } = props

  const opRef = useRef<OverlayPanel>(null)

  const showButton = !!(buttonText || icon || src)

  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const positionStyle = position ? styles[position] : undefined

  const pt = {
    root: {
      className: cx(
        styles['ad-popover'],
        positionStyle,
        popoverClass,
        className
      ),
      'data-position': position,
    },
    content: {
      className: styles['ad-popover-content'],
    },
  }

  return (
    <>
      {showButton && (
        <AdButton
          label={buttonText}
          icon={icon}
          src={src}
          className={cx(
            buttonClass,
            styles['ad-popover-toggle'],
            positionStyle,
            position
          )}
          style={typeof buttonStyle === 'object' ? buttonStyle : undefined}
          rounded
          onClick={(e) => opRef.current?.toggle(e)}
        />
      )}

      <OverlayPanel ref={opRef} {...rest} pt={pt}>
        {children}
      </OverlayPanel>
    </>
  )
}
