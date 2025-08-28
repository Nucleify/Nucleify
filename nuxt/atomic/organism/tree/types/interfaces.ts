import type { TreeExpandedKeys, TreeSelectionKeys } from 'primevue/tree'
import type { TreeNode } from 'primevue/treenode'

export interface TreeInterface {
  value: TreeNode[]
  expandedKeys?: TreeExpandedKeys
  selectedKeys?: TreeSelectionKeys
  selectionMode?: 'single' | 'multiple' | 'checkbox'
  metaKeySelection?: boolean
  loading?: boolean
  loadingIcon?: string
  loadingMode?: 'mask' | 'icon'
  filter?: boolean
  filterBy?: string
  filterMode?: 'lenient' | 'strict'
  filterPlaceholder?: string
  filterLocale?: string
  highlightOnSelect?: boolean
  scrollHeight?: string | 'flex'
  ariaLabel?: string
  ariaLabelledby?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
