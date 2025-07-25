// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ref } from 'vue'

import type { DockItemInterface } from 'atomic'
import { logout } from 'atomic'

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
  [undefined, undefined, '/home', undefined, undefined, undefined, true],
  ['pi pi-crown', 'Admin Panel', '/admin', undefined, 'admin'],
  ['pi pi-sitemap', 'Structural', '/structural', undefined, 'structural'],
  ['pi pi-chart-line', 'Dashboard', '/dashboard', undefined, 'dashboard'],
  ['pi pi-box', 'Entities', '/entities', undefined, 'entities'],
  ['pi pi-history', 'Activities', '/activity-log', undefined, 'activity-log'],
  ['pi pi-envelope disabled-item', 'Messages'],
  ['pi pi-calendar disabled-item', 'Calendar'],
  ['pi pi-user disabled-item', 'Profile'],
  ['pi pi-cog', 'Settings', '/settings', undefined, 'settings'],
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
