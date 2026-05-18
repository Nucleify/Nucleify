'use client'

import { BreadCrumb } from 'primereact/breadcrumb'

import { AdIcon, type AnchorInterface } from 'nucleify'

import './_index.scss'

const items: AnchorInterface[] = [
  { label: 'backoffice', href: '/', icon: 'mdi:home' },
  { label: 'About', href: '/about' },
]

export function NucBreadcrumb() {
  return (
    <BreadCrumb
      className="nuc-breadcrumb"
      home={{
        label: items[0].label,
        url: items[0].href,
        icon: (
          <span
            className="p-menuitem-icon"
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <AdIcon icon={items[0].icon!} />
          </span>
        ),
      }}
      model={items.slice(1).map((item) => ({
        label: item.label,
        url: item.href,
        icon: item.icon ? <AdIcon icon={item.icon} /> : undefined,
      }))}
      pt={{
        separatorIcon: { className: 'pi pi-angle-right' },
      }}
    />
  )
}
