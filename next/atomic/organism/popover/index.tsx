'use client'

import { OverlayPanel } from 'primereact/overlaypanel'
import type { JSX, MouseEvent } from 'react'
import { useRef } from 'react'

import styles from './index.module.scss'
import type { PopoverInterface } from './types'

import { AdButton } from '../../atom/button'

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
    renderTrigger,
    ...rest
  } = props

  const opRef = useRef<OverlayPanel>(null)

  const showButton = !!(buttonText || icon || src)

  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const positionStyle = position ? styles[position] : undefined

  const toggle = (event: MouseEvent) => {
    opRef.current?.toggle(event)
  }

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
      {renderTrigger
        ? renderTrigger(toggle)
        : showButton && (
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
              onClick={toggle}
            />
          )}

      <OverlayPanel ref={opRef} {...rest} pt={pt}>
        {children}
      </OverlayPanel>
    </>
  )
}
