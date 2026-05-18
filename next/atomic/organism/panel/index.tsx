import { Panel } from 'primereact/panel'
import type { JSX } from 'react'

import type { PanelInterface } from './types'

export function AdPanel({
  className,
  content,
  children,
  ...props
}: PanelInterface): JSX.Element {
  return (
    <Panel
      {...props}
      className={[className, 'ad-panel'].filter(Boolean).join(' ')}
    >
      {content ?? children}
    </Panel>
  )
}
