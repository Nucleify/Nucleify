export type OpenDialogFunctionType = (
  action: ActionType,
  object?: ObjectType
) => void

export type CloseDialogType = (action: ActionType) => void

export type ConfirmDialogFunctionType = (
  id?: number,
  getData?: () => void,
  close?: (method: string) => void
) => Promise<void>
