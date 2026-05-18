import { Tooltip } from 'primereact/tooltip'
import type { JSX } from 'react'

import type { TooltipInterface } from './types'

export function AdTooltip(props: TooltipInterface): JSX.Element {
  return <Tooltip {...props} />
}
