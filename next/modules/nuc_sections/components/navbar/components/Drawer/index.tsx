'use client'

import { Sidebar, type SidebarProps } from 'primereact/sidebar'
import type { JSX, ReactNode } from 'react'

type NucNavbarDrawerProps = SidebarProps & {
  children?: ReactNode
}

export function NucNavbarDrawer({
  children,
  className = '',
  position = 'right',
  blockScroll = true,
  ...rest
}: NucNavbarDrawerProps): JSX.Element {
  const drawerClassName = ['navbar-drawer', 'p-drawer', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Sidebar
      {...rest}
      blockScroll={blockScroll}
      maskClassName="p-drawer-mask"
      pt={{
        closeButton: {
          className: 'p-drawer-close-button',
        },
      }}
      className={drawerClassName}
      position={position}
    >
      {children}
      <div className="template-authors" />
    </Sidebar>
  )
}
