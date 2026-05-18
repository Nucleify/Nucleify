import type { IconInterface } from '../../../atom/icon/types/interfaces'

export interface TileInterface extends IconInterface {
  adType?: AdTypeType
  header?: string
  href?: string
  count?: number
  countSecondary?: number
  textSecondary?: string
}
