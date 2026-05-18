import type { ModuleObjectInterface } from '../../types/interfaces'

export interface NucModulesListInterface {
  data: ModuleObjectInterface[]
  onModuleToggled?: () => void
  onModuleUninstalled?: () => void
}
