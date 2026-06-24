import { Tag } from 'primereact/tag'
import type { JSX } from 'react'

import type { TagInterface } from './types'

export function AdTag(props: TagInterface): JSX.Element {
  return <Tag {...props} />
}
