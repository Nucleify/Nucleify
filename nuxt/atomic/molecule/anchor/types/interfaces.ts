import type { StyleValue } from 'vue'

import type { AnchorRelType, AnchorTargetType } from 'atomic'

export interface AnchorInterface {
  href?: string
  src?: string
  alt?: string
  icon?: string
  label?: string
  rel?: AnchorRelType
  target?: AnchorTargetType
  tooltip?: string
  anchorClass?: string
  itemClass?: string
  style?: StyleValue
  fetchpriority?: 'high' | 'low'
}
