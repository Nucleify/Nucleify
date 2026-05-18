import { Knob } from 'primereact/knob'
import type { JSX } from 'react'

import type { KnobInterface } from './types'

export function AdKnob({ className, ...rest }: KnobInterface): JSX.Element {
  return <Knob {...rest} className={className} />
}
