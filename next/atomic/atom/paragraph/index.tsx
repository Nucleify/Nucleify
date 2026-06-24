import type { JSX, ReactNode } from 'react'

import type { ParagraphInterface } from './types'

export function AdParagraph({
  text,
  className,
  children,
}: ParagraphInterface & { children?: ReactNode }): JSX.Element {
  return (
    <p className={className}>
      {text}
      {children}
    </p>
  )
}
