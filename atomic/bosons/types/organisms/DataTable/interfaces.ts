import {
    ActionInterface,
    ColorItemStyleInterface,
    LoadingType,
    ObjectNameType,
    OpenDialogFunctionType,
} from 'atomic/bosons/types'

import { SelectedObjectType } from '@/types'

export interface DataTableInterface {
    data: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    type: ObjectNameType
    loading: LoadingType
    actions?: ActionInterface
    styles: ColorItemStyleInterface
    openDialog: OpenDialogFunctionType
    selectedObject?: SelectedObjectType
}
