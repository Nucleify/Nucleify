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
  [undefined, 'Home', 'home', undefined, undefined, undefined, true],
  ['prime:crown', 'Admin Panel', 'admin.dock.adminPanel', undefined, 'admin'],
  ['prime:sitemap', 'Structural', 'admin.dock.structural', undefined, 'structural'],
  ['prime:chart-line', 'Dashboard', 'admin.dock.dashboard', undefined, 'dashboard'],
  ['prime:box', 'Entities', 'admin.dock.entities', undefined, 'entities'],
  ['prime:history', 'Activities', 'admin.dock.activities', undefined, 'activity-log'],
  ['prime:file', 'Files', 'admin.dock.files', undefined, 'files'],
  ['prime:check-square', 'Tasks', 'admin.dock.tasks', undefined, 'tasks'],
  ['prime:calendar', 'Calendar', undefined, 'disabled-item'],
  ['prime:user', 'Profile', undefined, 'disabled-item'],
  ['prime:cog', 'Settings', 'admin.dock.settings', undefined, 'settings'],
  ['prime:sign-out', 'admin.dock.logout', undefined, undefined, undefined, logout],
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
