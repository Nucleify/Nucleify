'use client'

import { TabPanel, TabView } from 'primereact/tabview'
import type { JSX } from 'react'

import type { TabPanelInterface, TabsInterface } from './types'

export function AdTabPanel(props: TabPanelInterface): JSX.Element {
  return <TabPanel {...props} />
}

export function AdTabs({
  className,
  lists,
  panels,
  children,
  ...props
}: TabsInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const isAutoRender =
    Array.isArray(lists) &&
    Array.isArray(panels) &&
    lists.length === panels.length

  return (
    <TabView {...props} className={cx(className, 'ad-tabs')}>
      {isAutoRender
        ? lists.map((list, idx) => (
            <TabPanel key={list.value} header={list.header}>
              {panels[idx]?.content}
            </TabPanel>
          ))
        : children}
    </TabView>
  )
}
