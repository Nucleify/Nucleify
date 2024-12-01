import { PassThrough } from 'primevue/ts-helpers'
import {
  OrganizationChartCollapsedKeys,
  OrganizationChartNode,
  OrganizationChartPassThroughOptions,
  OrganizationChartSelectionKeys,
} from 'primevue'

export interface OrganizationChartInterface {
  value?: OrganizationChartNode
  selectionKeys?: OrganizationChartSelectionKeys
  selectionMode?: 'single' | 'multiple'
  collapsedKeys?: OrganizationChartCollapsedKeys
  collapsible?: boolean
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<OrganizationChartPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
