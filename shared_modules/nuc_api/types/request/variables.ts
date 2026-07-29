export type ActionType = 'delete' | 'show' | 'create' | 'edit'

export type CloseDialogType = (action?: ActionType) => void
