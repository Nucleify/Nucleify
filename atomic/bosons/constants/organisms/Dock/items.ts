import { ref } from 'vue'

import { DockItemInterface } from 'atomic/bosons/types'
import { logout } from 'atomic/bosons/utils'

const createDockItem = (
  icon?: string,
  label?: string,
  url?: string,
  className?: string,
  click?: () => void,
  logo?: boolean
): DockItemInterface =>
  ({
    icon,
    label,
    url,
    class: className,
    click,
    logo,
  }) as const

const dockData: readonly DockItemInterface[] = [
  [undefined, undefined, 'home', 'logo', undefined, true],
  ['pi pi-user-edit', 'Admin Panel', 'admin'],
  ['pi pi-chart-line', 'Dashboard', 'dashboard'],
  ['pi pi-phone', 'Contacts', 'contacts'],
  ['pi pi-comment', 'Articles', 'articles'],
  ['pi pi-history', 'Activities', 'activity-log'],
  ['pi pi-envelope disabled-item', 'Messages'],
  ['pi pi-check-square disabled-item', 'Tasks'],
  ['pi pi-calendar disabled-item', 'Calendar'],
  ['pi pi-dollar disabled-item', 'Money'],
  ['pi pi-cog', 'Settings', 'settings'],
  ['pi pi-sign-out', 'Logout', undefined, undefined, logout],
  [undefined, 'position', undefined, 'position'],
] as const

export const dockItems: readonly DockItemInterface[] = ref(
  dockData.map(
    ([
      icon,
      label,
      url,
      className,
      click,
      logo,
    ]): readonly DockItemInterface[] =>
      createDockItem(icon, label, url, className, click, logo)
  )
) as const
