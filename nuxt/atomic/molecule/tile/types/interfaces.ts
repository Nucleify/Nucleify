import type { AdTypeType } from 'atomic'

export interface TileInterface {
  adType?: AdTypeType
  header?: string
  href?: string
  count?: number
  icon?: string
  countSecondary?: number
  textSecondary?: string
}
