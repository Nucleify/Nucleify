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
  [undefined, 'Home', '/home', undefined, undefined, undefined, true],
  ['prime:crown', 'Admin Panel', '/admin', undefined, 'admin'],
  ['prime:sitemap', 'Structural', '/structural', undefined, 'structural'],
  ['prime:chart-line', 'Dashboard', '/dashboard', undefined, 'dashboard'],
  ['prime:box', 'Entities', '/entities', undefined, 'entities'],
  ['prime:history', 'Activities', '/activity-log', undefined, 'activity-log'],
  ['prime:file', 'Files', '/files', undefined, 'files'],
  ['prime:check-square', 'Tasks', '/tasks', undefined, 'tasks'],
  ['prime:calendar', 'Calendar', undefined, 'disabled-item'],
  ['prime:cog', 'Settings', '/settings#modules', undefined, 'settings'],
  ['prime:sign-out', 'Logout', undefined, undefined, undefined, logout],
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
