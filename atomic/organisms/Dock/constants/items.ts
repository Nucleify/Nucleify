// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ref } from 'vue'

import { DockItemInterface, logout } from 'atomic'

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
  ['pi pi-crown', 'Admin Panel', 'admin'],
  ['pi pi-chart-line', 'Dashboard', 'dashboard'],
  ['pi pi-box', 'Entities', 'entities'],
  ['pi pi-history', 'Activities', 'activity-log'],
  ['pi pi-envelope disabled-item', 'Messages'],
  ['pi pi-calendar disabled-item', 'Calendar'],
  ['pi pi-user disabled-item', 'Profile'],
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
