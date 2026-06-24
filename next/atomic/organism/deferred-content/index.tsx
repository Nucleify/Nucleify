import { DeferredContent } from 'primereact/deferredcontent'
import type { JSX } from 'react'

import type { DeferredContentInterface } from './types'

export function AdDeferredContent({
  className = '',
  children,
  ...rest
}: DeferredContentInterface): JSX.Element {
  const mergedClassName = ['ad-deferredcontent', className]
    .filter(Boolean)
    .join(' ')

  return (
    <DeferredContent {...rest} className={mergedClassName || undefined}>
      {children}
    </DeferredContent>
  )
}
