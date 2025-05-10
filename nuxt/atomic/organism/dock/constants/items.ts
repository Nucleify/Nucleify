// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ref } from 'vue'

import { DockItemInterface, logout } from 'atomic'

const createDockItem = (
  icon?: string,
  label?: string,
  url?: string,
  className?: string,
  adType?: string,
  click?: () => void,
  logo?: boolean
): DockItemInterface =>
  ({
    icon,
    label,
    url,
    class: className,
    adType,
    click,
    logo,
  }) as const

const dockData: readonly DockItemInterface[] = [
  [undefined, undefined, '/home', 'logo', undefined, undefined, true],
  ['pi pi-crown', 'Admin Panel', '/home', undefined, 'admin'],
  ['pi pi-sitemap', 'Structural', '/home', undefined, 'structural'],
  ['pi pi-chart-line', 'Dashboard', '/home', undefined, 'dashboard'],
  ['pi pi-box', 'Entities', '/entities', undefined, 'entities'],
  ['pi pi-history', 'Activities', '/home', undefined, 'activity-log'],
  ['pi pi-envelope disabled-item', 'Messages'],
  ['pi pi-calendar disabled-item', 'Calendar'],
  ['pi pi-user disabled-item', 'Profile'],
  ['pi pi-cog', 'Settings', '/home', undefined, 'settings'],
  ['pi pi-sign-out', 'Logout', undefined, undefined, undefined, logout],
  [undefined, 'position', undefined, 'position'],
] as const

export const dockItems: readonly DockItemInterface[] = ref(
  dockData.map(
    ([
      icon,
      label,
      url,
      className,
      adType,
      click,
      logo,
    ]): readonly DockItemInterface[] =>
      createDockItem(icon, label, url, className, adType, click, logo)
  )
) as const
