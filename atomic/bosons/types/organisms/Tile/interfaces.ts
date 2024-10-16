import { ObjectNameType } from 'atomic/bosons/types'

export interface TileInterface {
  header?: string
  href?: string
  count?: number
  icon?: string
  countSecondary?: string
  textSecondary?: string
  type?: ObjectNameType
}
