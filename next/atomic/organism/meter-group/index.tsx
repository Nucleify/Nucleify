import { MeterGroup } from 'primereact/metergroup'
import type { JSX } from 'react'

import type { MeterGroupInterface } from './types'

export function AdMeterGroup(props: MeterGroupInterface): JSX.Element {
  return <MeterGroup {...props} />
}
