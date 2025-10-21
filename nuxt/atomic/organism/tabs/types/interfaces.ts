import type { TabViewProps } from 'primevue'

export interface TabsInterface extends TabViewProps {
  lists?: TabListInterface[]
  panels?: TabPanelInterface[]
}
export interface TabListInterface {
  value: string | number
  header?: string
}
export interface TabPanelInterface {
  value: string | number
  content?: string
}
