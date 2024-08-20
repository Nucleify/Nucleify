import {
    ActionInterface,
    ColorItemStyleInterface,
    LoadingType,
    ObjectNameType,
    OpenDialogFunctionType,
} from 'atomic/bosons/types'

import { OpenMenuFunctionType, SelectedObjectType } from '@/types'

export interface DataTableInterface {
    data: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    type: ObjectNameType
    loading: LoadingType
    actions?: ActionInterface
    styles: ColorItemStyleInterface
    openMenu: OpenMenuFunctionType
    openDialog: OpenDialogFunctionType
    selectedObject?: SelectedObjectType
}
