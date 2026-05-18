import { OrganizationChart } from 'primereact/organizationchart'
import type { JSX } from 'react'

import type { OrganizationChartInterface } from './types'

export function AdOrganizationChart(
  props: OrganizationChartInterface
): JSX.Element {
  return <OrganizationChart {...props} />
}
