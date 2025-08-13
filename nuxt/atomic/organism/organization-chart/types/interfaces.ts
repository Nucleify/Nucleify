import type {
  OrganizationChartCollapsedKeys,
  OrganizationChartNode,
  OrganizationChartSelectionKeys,
} from 'primevue'

export interface OrganizationChartInterface {
  value?: OrganizationChartNode
  selectionKeys?: OrganizationChartSelectionKeys
  selectionMode?: 'single' | 'multiple'
  collapsedKeys?: OrganizationChartCollapsedKeys
  collapsible?: boolean
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
