import { Button, type ButtonProps } from 'primereact/button'
import type { CSSProperties, JSX, ReactNode } from 'react'

import styles from './index.module.scss'
import type { ButtonInterface } from './types'
import { AdIcon } from '../icon'
import { AdImage } from '../image'

export function AdButton({
  adType,
  media,
  variant,
  rounded,
  severity,
  width,
  height,
  gap,
  padding,
  label,
  icon,
  src,
  alt,
  children,
  className = '',
  style,
  ...rest
}: ButtonInterface & { children?: ReactNode }): JSX.Element {
  const isPrimary = (severity as string) === 'primary'
  const primeSeverity = isPrimary
    ? undefined
    : (severity as ButtonProps['severity'])

  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(
        styles['ad-button'],
        icon && styles['with-ad-icon'],
        media && styles[`${media}-button`],
        variant && styles[`${variant}-button`],
        rounded && styles['rounded-button'],
        isPrimary && styles['primary-button'],
        className
      ),
      style: {
        width,
        height,
        gap,
        padding,
        ...style,
      } as CSSProperties,
      ...(adType ? { 'ad-type': adType } : {}),
    },
    label: {
      className: styles['p-button-label'],
    },
    icon: {
      className: styles['prime-icon'],
    },
  }

  return (
    <Button
      {...rest}
      aria-label={rest['aria-label'] ?? label}
      severity={primeSeverity}
      rounded={rounded}
      pt={pt}
    >
      {src && <AdImage src={src} alt={alt} />}
      {icon && <AdIcon icon={icon} />}
      {label ? <span className={styles['p-button-label']}>{label}</span> : null}
      {children}
    </Button>
  )
}
