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
  ['pi pi-crown', 'admin.dock.adminPanel', '/admin', undefined, 'admin'],
  [
    'pi pi-sitemap',
    'admin.dock.structural',
    '/structural',
    undefined,
    'structural',
  ],
  [
    'pi pi-chart-line',
    'admin.dock.dashboard',
    '/dashboard',
    undefined,
    'dashboard',
  ],
  ['pi pi-box', 'admin.dock.entities', '/entities', undefined, 'entities'],
  [
    'pi pi-history',
    'admin.dock.activities',
    '/activity-log',
    undefined,
    'activity-log',
  ],
  ['pi pi-envelope disabled-item', 'admin.dock.messages'],
  ['pi pi-calendar disabled-item', 'admin.dock.calendar'],
  ['pi pi-user disabled-item', 'admin.dock.profile'],
  ['pi pi-cog', 'admin.dock.settings', '/settings', undefined, 'settings'],
  [
    'pi pi-sign-out',
    'admin.dock.logout',
    undefined,
    undefined,
    undefined,
    logout,
  ],
  [undefined, 'admin.dock.position', undefined, 'position'],
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
