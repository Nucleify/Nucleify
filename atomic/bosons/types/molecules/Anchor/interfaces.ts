import { StyleValue } from 'vue'

import { AnchorRelType, AnchorTargetType } from 'atomic/bosons/types'

export interface AnchorInterface {
  href?: string
  src?: string
  icon?: string
  label?: string
  rel?: AnchorRelType
  target?: AnchorTargetType
  tooltip?: string
  anchorClass?: string
  itemClass?: string
  style?: StyleValue
}
