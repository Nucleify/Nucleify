import type { StyleValue } from 'vue'

import type { AnchorRelType, AnchorTargetType, IconInterface } from 'atomic'

export interface AnchorInterface extends IconInterface {
  href?: string
  src?: string
  alt?: string
  label?: string
  rel?: AnchorRelType
  target?: AnchorTargetType
  tooltip?: string
  anchorClass?: string
  itemClass?: string
  style?: StyleValue
  fetchpriority?: 'high' | 'low'
}
