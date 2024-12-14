import { ElementDirectionType, PositionType } from 'atomic'

export interface DividerInterface {
  align?: PositionType | 'center'
  layout?: ElementDirectionType
  type?: 'solid' | 'dashed' | 'dotted'
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
