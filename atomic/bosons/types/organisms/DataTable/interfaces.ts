import { InputHTMLAttributes, TableHTMLAttributes } from 'vue'
import {
    DataTableEditingRows,
    DataTableExpandedRows,
    DataTableFilterMeta,
    DataTablePassThroughOptions,
    DataTableSortMeta,
} from 'primevue/datatable'
import { HintedString, Nullable, PassThrough } from 'primevue/ts-helpers'
import { VirtualScrollerProps } from 'primevue/virtualscroller'

import {
    ActionInterface,
    ColorItemStyleInterface,
    LoadingType,
    ObjectNameType,
    OpenDialogFunctionType,
} from 'atomic/bosons/types'

import { SelectedObjectType } from '@/types'
import { PassThroughOptions } from 'primevue/passthrough'

export interface DataTableInterface {
    value: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    dataKey?: string
    rows?: number
    first?: number
    totalRecords?: number
    paginator?: boolean
    paginatorPosition?: 'both' | 'top' | 'bottom'
    alwaysShowPaginator?: boolean
    paginatorTemplate?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    pageLinkSize?: number
    rowsPerPageOptions?: number[]
    currentPageReportTemplate?: string
    lazy?: boolean
    loading?: LoadingType
    sortField?: string
    sortOrder?: number
    nullSortOrder?: number
    defaultSortOrder?: number
    multiSortMeta?: DataTableSortMeta[]
    sortMode?: 'multiple' | 'single'
    removableSort?: boolean
    filters?: DataTableFilterMeta
    filterDisplay?: 'menu' | 'row'
    globalFilterFields?: (string | void)[]
    filterLocale?: string
    selection?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    selectionMode?: 'multiple' | 'single'
    compareSelectionBy?: 'equals' | 'deepEquals'
    metaKeySelection?: boolean
    contextMenu?: boolean
    contextMenuSelection?: boolean
    selectAll?: Nullable<boolean>
    rowHover?: boolean
    csvSeparator?: string
    exportFilename?: string
    exportFunction?: void
    resizableColumns?: boolean
    columnResizeMode?: 'expand' | 'fit'
    reorderableColumns?: boolean
    expandedRows?: null | any[] | DataTableExpandedRows // eslint-disable-line @typescript-eslint/no-explicit-any
    rowGroupMode?: 'rowspan' | 'subheader'
    groupRowsBy?: string | string[] | void
    expandableRowGroups?: boolean
    expandedRowGroups?: any[] | DataTableExpandedRows // eslint-disable-line @typescript-eslint/no-explicit-any
    stateStorage?: 'local' | 'session'
    stateKey?: string
    editMode?: 'cell' | 'row'
    editingRows?: any[] | DataTableEditingRows // eslint-disable-line @typescript-eslint/no-explicit-any
    rowClass?: string
    rowStyle?: object
    scrollable?: boolean
    scrollHeight?: HintedString<'flex'>
    virtualScrollerOptions?: VirtualScrollerProps
    frozenValue?: null | any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    breakpoint?: string
    showGridlines?: boolean
    stripedRows?: boolean
    highlightOnSelect?: boolean
    size?: 'small' | 'large'
    tableStyle?: string | object
    tableClass?: string | object
    tableProps?: TableHTMLAttributes
    filterInputProps?: InputHTMLAttributes
    pt?: PassThrough<DataTablePassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: boolean
    type?: ObjectNameType
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
    sortable?: boolean
}

export interface ColumnsInterface {
    activity: ColumnInterface[]
    article: ColumnInterface[]
    contact: ColumnInterface[]
    user: ColumnInterface[]
}
