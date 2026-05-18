import type { DockItemInterface } from 'atomic'
import { logout } from 'modules'

const createDockItem = (
  icon?: string,
  label?: string,
  url?: string,
  className?: string,
  adType?: string,
  click?: () => void,
  logo?: boolean
): DockItemInterface => ({
  icon,
  label,
  url,
  class: className,
  adType,
  click,
  logo,
})

type DockDataTuple = [
  string?, // icon
  string?, // label
  string?, // url
  string?, // className
  string?, // adType
  (() => void)?, // click
  boolean?, // logo
]

function getDockData(
  lang: string,
  t: (key: string) => string
): DockDataTuple[] {
  return [
    [
      undefined,
      t('dock-home'),
      `/${lang}/home`,
      undefined,
      undefined,
      undefined,
      true,
    ],
    ['prime:crown', t('dock-admin'), `/${lang}/admin`, undefined, 'admin'],
    [
      'prime:sitemap',
      t('dock-structural'),
      `/${lang}/structural`,
      undefined,
      'structural',
    ],
    [
      'prime:box',
      t('dock-entities'),
      `/${lang}/entities`,
      undefined,
      'entities',
    ],
    ['prime:file', t('dock-files'), `/${lang}/files`, undefined, 'files'],
    ['prime:calendar', t('dock-calendar'), undefined, 'disabled-item'],
    [
      'prime:history',
      t('dock-activities'),
      `/${lang}/activity-log`,
      undefined,
      'activity-log',
    ],
    [
      'prime:language',
      t('dock-translations'),
      `/${lang}/translations`,
      undefined,
      'translations',
    ],
    [
      'prime:cog',
      t('dock-settings'),
      `/${lang}/settings#modules`,
      undefined,
      'settings',
    ],
    [
      'prime:sign-out',
      t('dock-logout'),
      undefined,
      undefined,
      undefined,
      logout,
    ],
    [undefined, 'position', undefined, 'position'],
  ]
}

export function getDockItems(
  lang: string,
  t: (key: string) => string
): readonly DockItemInterface[] {
  return getDockData(lang, t).map(
    ([icon, label, url, className, adType, click, logo]): DockItemInterface =>
      createDockItem(icon, label, url, className, adType, click, logo)
  )
}
