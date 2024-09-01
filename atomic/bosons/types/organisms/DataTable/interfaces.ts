import {
    ActionInterface,
    ColorItemStyleInterface,
    LoadingType,
    ObjectNameType,
    OpenDialogFunctionType,
} from 'atomic/bosons/types'

import { SelectedObjectType } from '@/types'

export interface DataTableInterface {
    value: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    rows?: number
    type?: ObjectNameType
    loading: LoadingType
    actions?: ActionInterface
    styles?: ColorItemStyleInterface
    openDialog: OpenDialogFunctionType
    selectedObject?: SelectedObjectType
}

export interface DataTableSkeletonInterface {
    rows: []
    loading: LoadingType
    specificColumns: ColumnInterface[]
}

export interface ColumnInterface {
    field?: string
    header?: string
    class?: string
}

export interface ColumnsInterface {
    activity: ColumnInterface[]
    article: ColumnInterface[]
    contact: ColumnInterface[]
    user: ColumnInterface[]
}
