import { ScrollPanel } from 'primereact/scrollpanel'
import type { JSX, ReactNode } from 'react'

import type { ScrollPanelInterface } from './types'

export function AdScrollPanel({
  className,
  children,
  ...props
}: ScrollPanelInterface & { children?: ReactNode }): JSX.Element {
  return (
    <ScrollPanel
      {...props}
      className={[className, 'ad-scroll-panel'].filter(Boolean).join(' ')}
    >
      {children}
    </ScrollPanel>
  )
}
