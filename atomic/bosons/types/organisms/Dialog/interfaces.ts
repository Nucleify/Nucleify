import { StyleValue } from 'vue'

import { ObjectType, SelectedObjectType } from '@/types'

import {
    ActionType,
    CloseDialogFunctionType,
    ConfirmDialogFunctionType,
    OpenDialogFunctionType,
    VisibleType,
} from 'atomic/bosons/types'

export interface DialogInterface {
    entity: 'user' | 'contact' | 'article'
    action: ActionType
    visible: boolean
    title?: string
    fields?: Array<{
        name: string
        label: string
        type: string
        key: string
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        props?: Record<string, any>
    }>
    selectedObject?: ObjectType
    data?: ObjectType[]
    getData?: () => void
    confirmButtonLabel?: string
    confirm?: ConfirmDialogFunctionType
    cancelButtonLabel?: string
    close: CloseDialogFunctionType
    style?: StyleValue
}

export interface UseDialogInterface {
    visibleShow: VisibleType
    visibleCreate: VisibleType
    visibleEdit: VisibleType
    visibleDelete: VisibleType
    selectedObject: SelectedObjectType
    openDialog: OpenDialogFunctionType
    closeDialog: CloseDialogFunctionType
}
