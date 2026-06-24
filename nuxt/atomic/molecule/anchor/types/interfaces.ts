import type { StyleValue } from 'vue'

import type { AnchorRelType, AnchorTargetType, IconInterface } from 'nucleify'

export interface AnchorInterface extends /* @vue-ignore */ IconInterface {
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
