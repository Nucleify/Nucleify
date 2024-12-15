import {
  ActionInterface,
  ActionType,
  ObjectType,
  OpenDialogFunctionType,
} from 'atomic'

export const actions = (
  openDialog: OpenDialogFunctionType
): readonly ActionInterface[] => {
  const actionData: readonly [string, ActionType][] = [
    ['pi pi-eye', 'show'],
    ['pi pi-pencil', 'edit'],
    ['pi pi-trash', 'delete'],
  ] as const

  return actionData.map(
    ([icon, action]): ActionInterface => ({
      icon,
      click: (data: ObjectType) => openDialog(action, data),
    })
  )
}
