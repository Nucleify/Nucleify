'use client'

import { NucCube } from '../../../../nuc_templates/components/cube'
import type { ModuleObjectInterface } from '../../../types/interfaces'
import { NucModulesItemOptions } from './options'

import './_index.scss'

export interface NucModulesSettingsItemProps extends ModuleObjectInterface {
  onModuleToggled?: () => void
  onModuleUninstalled?: () => void
}

export function NucModulesSettingsItem({
  onModuleToggled,
  onModuleUninstalled,
  ...module
}: NucModulesSettingsItemProps) {
  return (
    <div className={`modules-settings-item${module.enabled ? ' active' : ''}`}>
      <a
        className="modules-settings-item-link"
        href={`/settings#module-${module.name}`}
      >
        <span
          title={module.enabled ? 'Enabled' : 'Disabled'}
          style={{ display: 'inline-flex' }}
        >
          <NucCube shiny={module.enabled} />
        </span>
        <div className="modules-settings-item-container">
          <div className="modules-settings-item-info">
            <label>{module.name}</label>
            <p>{module.description}</p>
          </div>
        </div>
      </a>
      <NucModulesItemOptions
        {...module}
        onModuleToggled={onModuleToggled}
        onModuleUninstalled={onModuleUninstalled}
      />
    </div>
  )
}
