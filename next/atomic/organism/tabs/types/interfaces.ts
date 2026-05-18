import type { TabPanelProps, TabViewProps } from 'primereact/tabview'
import type { ReactNode } from 'react'

export interface TabsInterface extends TabViewProps {
  lists?: TabListInterface[]
  panels?: TabPanelInterface[]
}

export interface TabListInterface {
  value: string | number
  header?: string
}

export interface TabPanelInterface extends TabPanelProps {
  value: string | number
  content?: ReactNode
}
