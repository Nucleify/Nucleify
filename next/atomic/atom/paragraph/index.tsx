import type { JSX, ReactNode } from 'react'

import type { ParagraphInterface } from './types'

export function AdParagraph({
  text,
  children,
}: ParagraphInterface & { children?: ReactNode }): JSX.Element {
  return (
    <p>
      {text}
      {children}
    </p>
  )
}
