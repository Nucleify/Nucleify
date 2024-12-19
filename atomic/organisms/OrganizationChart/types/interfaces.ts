import {
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
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
