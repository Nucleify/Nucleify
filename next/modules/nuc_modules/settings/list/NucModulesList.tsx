'use client'

import type { NucModulesListInterface } from './interfaces'
import { NucModulesSettingsItem } from './item'

import './_index.scss'

export default function NucModulesList({
  data,
  onModuleToggled,
  onModuleUninstalled,
}: NucModulesListInterface) {
  return (
    <div className="modules-settings-list">
      {data.map((module) => (
        <NucModulesSettingsItem
          key={module.name}
          {...module}
          onModuleToggled={onModuleToggled}
          onModuleUninstalled={onModuleUninstalled}
        />
      ))}
    </div>
  )
}
