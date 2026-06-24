import type { CSSProperties as StyleValue } from 'react'

import type { AnchorRelType, AnchorTargetType } from './variables'

import type { IconInterface } from '../../../atom/icon/types/interfaces'

export interface AnchorInterface extends IconInterface {
  href?: string
  title?: string
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
