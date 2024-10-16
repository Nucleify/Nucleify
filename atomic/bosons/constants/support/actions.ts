import {
  ActionInterface,
  ObjectType,
  OpenDialogFunctionType,
} from 'atomic/bosons/types'

export const actions = (
  openDialog: OpenDialogFunctionType
): readonly ActionInterface[] => {
  const actionData: readonly ActionInterface[] = [
    ['pi pi-eye', 'show'],
    ['pi pi-pencil', 'edit'],
    ['pi pi-trash', 'delete'],
  ] as const

  return actionData.map(([icon, action]): readonly ActionInterface[] => ({
    icon,
    click: (data: ObjectType) => openDialog(action, data),
  })) as const
}
