import { AdTypeType } from 'atomic/bosons/types'

export interface TileInterface {
  adType?: AdTypeType
  header?: string
  href?: string
  count?: number
  icon?: string
  countSecondary?: string
  textSecondary?: string
}
