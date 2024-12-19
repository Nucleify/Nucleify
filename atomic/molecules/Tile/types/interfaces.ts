import { AdTypeType } from 'atomic'

export interface TileInterface {
  adType?: AdTypeType
  header?: string
  href?: string
  count?: number
  icon?: string
  countSecondary?: string
  textSecondary?: string
}
