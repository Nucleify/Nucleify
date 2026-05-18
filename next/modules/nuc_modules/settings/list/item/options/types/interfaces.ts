import type { ModuleDialogAction } from '../../../../detail/types'

export interface ModuleDialogInterface {
  name: string
  enabled: boolean
  action: ModuleDialogAction
}
