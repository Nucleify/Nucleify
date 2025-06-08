import type { ElementDirectionType, PositionType } from 'atomic'

export interface DividerInterface {
  align?: PositionType | 'center'
  layout?: ElementDirectionType
  type?: 'solid' | 'dashed' | 'dotted'
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
