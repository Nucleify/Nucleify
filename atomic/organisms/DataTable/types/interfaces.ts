import { InputHTMLAttributes, TableHTMLAttributes } from 'vue'
import {
  DataTableEditButtonPropsOptions,
  DataTableEditingRows,
  DataTableExpandedRows,
  DataTableFilterButtonPropsOptions,
  DataTableFilterMeta,
  DataTableSortMeta,
} from 'primevue/datatable'
import { VirtualScrollerProps } from 'primevue/virtualscroller'

import {
  ActionInterface,
  ColorItemStyleInterface,
  LoadingType,
  ObjectNameType,
  SelectedObjectType,
  OpenDialogFunctionType,
  ElementSizeType,
} from 'atomic'

export interface DataTableInterface {
  adType: ObjectNameType
  value: any[] // eslint-disable-line
  dataKey?: string
  rows?: number
  first?: number
  totalRecords?: number
  paginator?: boolean
  paginatorPosition?: 'both' | 'top' | 'bottom'
  alwaysShowPaginator?: boolean
  paginatorTemplate?: any // eslint-disable-line
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
  globalFilterFields?: (string | void)[]
  filterLocale?: string
  selection?: any // eslint-disable-line
  selectionMode?: 'multiple' | 'single'
  compareSelectionBy?: 'equals' | 'deepEquals'
  metaKeySelection?: boolean
  contextMenu?: boolean
  contextMenuSelection?: any // eslint-disable-line
  selectAll?: boolean
  rowHover?: boolean
  csvSeparator?: string
  exportFilename?: string
  exportFunction?: void
  resizableColumns?: boolean
  columnResizeMode?: 'expand' | 'fit'
  reorderableColumns?: boolean
  expandedRows?: any[] | DataTableExpandedRows // eslint-disable-line
  expandedRowIcon?: string
  collaspeRowIcon?: string
  rowGroupMode?: 'rowspan' | 'subheader'
  groupRowsBy?: string | string[] | void
  expandableRowGroups?: boolean
  expandedRowGroups?: any[] | DataTableExpandedRows // eslint-disable-line
  stateStorage?: 'local' | 'session'
  stateKey?: string
  editMode?: 'cell' | 'row'
  editingRows?: any[] | DataTableEditingRows // eslint-disable-line
  rowClass?: string
  rowStyle?: object
  scrollable?: boolean
  scrollHeight?: 'flex'
  virtualScrollerOptions?: VirtualScrollerProps
  frozenValue?: null | any[] // eslint-disable-line
  breakpoint?: string
  showHeaders?: boolean
  showGridlines?: boolean
  stripedRows?: boolean
  highlightOnSelect?: boolean
  size?: ElementSizeType
  tableStyle?: string | object
  tableClass?: string | object
  tableProps?: TableHTMLAttributes
  filterInputProps?: InputHTMLAttributes
  filterButtonProps?: DataTableFilterButtonPropsOptions
  editButtonProps?: DataTableEditButtonPropsOptions
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
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
