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
  [undefined, undefined, '/home', 'logo', undefined, undefined, true],
  ['prime:crown', 'admin.dock.adminPanel', '/admin', undefined, 'admin'],
  [
    'prime:sitemap',
    'admin.dock.structural',
    '/structural',
    undefined,
    'structural',
  ],
  [
    'prime:chart-line',
    'admin.dock.dashboard',
    '/dashboard',
    undefined,
    'dashboard',
  ],
  ['prime:box', 'admin.dock.entities', '/entities', undefined, 'entities'],
  [
    'prime:history',
    'admin.dock.activities',
    '/activity-log',
    undefined,
    'activity-log',
  ],
  ['prime:envelope disabled-item', 'admin.dock.messages'],
  ['prime:calendar disabled-item', 'admin.dock.calendar'],
  ['prime:user disabled-item', 'admin.dock.profile'],
  ['prime:cog', 'admin.dock.settings', '/settings', undefined, 'settings'],
  [
    'prime:sign-out',
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
