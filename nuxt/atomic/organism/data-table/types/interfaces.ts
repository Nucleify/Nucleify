import type { InputHTMLAttributes, TableHTMLAttributes } from 'vue'

import type {
  ActionInterface,
  ColorItemStyleInterface,
  ElementSizeType,
  ElementVariantType,
  LoadingType,
  ObjectNameType,
  OpenDialogFunctionType,
  SelectedObjectType,
} from 'atomic'

import type {
  DataTableEditButtonPropsOptions,
  DataTableEditingRows,
  DataTableExpandedRows,
  DataTableFilterButtonPropsOptions,
  DataTableFilterMeta,
  DataTableSortMeta,
} from 'primevue/datatable'
import type { VirtualScrollerProps } from 'primevue/virtualscroller'

export interface DataTableInterface {
  adType: ObjectNameType
  value: unknown[]
  dataKey?: string
  rows?: number
  first?: number
  totalRecords?: number
  paginator?: boolean
  paginatorPosition?: 'both' | 'top' | 'bottom'
  alwaysShowPaginator?: boolean
  paginatorTemplate?: object
  pageLinkSize?: number
  rowsPerPageOptions?: number[]
  currentPageReportTemplate?: string
  lazy?: boolean
  loading?: LoadingType
  loadingIcon?: string
  sortField?: string
  sortOrder?: number
  nullSortOrder?: number
  defaultSortOrder?: number
  multiSortMeta?: DataTableSortMeta[]
  sortMode?: 'multiple' | 'single'
  removableSort?: boolean
  filters?: DataTableFilterMeta
  filterDisplay?: 'menu' | 'row'
  globalFilterFields?: (string | undefined)[]
  filterLocale?: string
  filterMatchMode?: 'endsWith' | 'startsWith' | 'contains'
  filterFields?: string[]
  editable?: boolean
  placeholder?: string
  size?: ElementSizeType
  invalid?: boolean
  disabled?: boolean
  variant?: ElementVariantType
  rowHover?: boolean
  csvSeparator?: string
  exportFilename?: string
  exportFunction?: () => void
  resizableColumns?: boolean
  columnResizeMode?: 'expand' | 'fit'
  reorderableColumns?: boolean
  expandedRows?: unknown[] | DataTableExpandedRows
  expandedRowIcon?: string
  collaspeRowIcon?: string
  rowGroupMode?: 'rowspan' | 'subheader'
  groupRowsBy?:
    | string
    | number
    | symbol
    | ((field: unknown) => object)
    | undefined
  expandableRowGroups?: boolean
  expandedRowGroups?: unknown[] | DataTableExpandedRows
  stateStorage?: 'local' | 'session'
  stateKey?: string
  editMode?: 'cell' | 'row'
  editingRows?: unknown[] | DataTableEditingRows
  rowClass?: ((data: unknown) => string | object | undefined) | undefined
  rowStyle?: ((data: unknown) => object | object[] | undefined) | undefined
  scrollable?: boolean
  scrollHeight?: 'flex'
  virtualScrollerOptions?: VirtualScrollerProps
  frozenValue?: null | unknown[]
  breakpoint?: string
  showHeaders?: boolean
  showGridlines?: boolean
  stripedRows?: boolean
  highlightOnSelect?: boolean
  selectionMode?: 'multiple' | 'single'
  compareSelectionBy?: 'equals' | 'deepEquals'
  metaKeySelection?: boolean
  contextMenu?: boolean
  contextMenuSelection?: unknown
  selectAll?: boolean
  tableStyle?: string | object
  tableClass?: string | object
  tableProps?: TableHTMLAttributes
  filterInputProps?: InputHTMLAttributes
  filterButtonProps?: DataTableFilterButtonPropsOptions
  editButtonProps?: DataTableEditButtonPropsOptions
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  actions?: ActionInterface
  styles?: ColorItemStyleInterface
  openDialog?: OpenDialogFunctionType
  selectedObject?: SelectedObjectType
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
  money: ColumnInterface[]
  user: ColumnInterface[]
}
