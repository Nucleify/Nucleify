import { SpeedDial } from 'primereact/speeddial'
import type { JSX } from 'react'

import type { SpeedDialInterface } from './types'

export function AdSpeedDial({
  className,
  ...props
}: SpeedDialInterface): JSX.Element {
  return (
    <SpeedDial
      {...props}
      className={[className, 'ad-speed-dial'].filter(Boolean).join(' ')}
    />
  )
}
