import type { IconInterface } from 'nucleify'

export interface TileInterface extends IconInterface {
  nuiType?: NuiTypeType
  header?: string
  href?: string
  count?: number
  countSecondary?: number
  textSecondary?: string
}
