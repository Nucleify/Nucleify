import { Badge } from 'primereact/badge'
import type { JSX } from 'react'

import type { BadgeInterface } from './types'

export function AdBadge(props: BadgeInterface): JSX.Element {
  return <Badge {...props} />
}
