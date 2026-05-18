export interface ModuleReadmeDialogInterface {
  modulePath?: string
}

export interface ModuleReadmeDialogComponentProps
  extends ModuleReadmeDialogInterface {
  visible: boolean
  onHide: () => void
}

export type ModuleDialogAction = 'toggle' | 'uninstall'

export interface ModuleItemOptionsDialogProps {
  visible: boolean
  onHide: () => void
  name: string
  enabled: boolean
  action: ModuleDialogAction
  onConfirm: () => void | Promise<void>
}
