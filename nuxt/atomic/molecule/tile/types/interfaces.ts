import type { IconInterface } from 'atomic'

export interface TileInterface extends IconInterface {
  adType?: AdTypeType
  header?: string
  href?: string
  count?: number
  countSecondary?: number
  textSecondary?: string
}
