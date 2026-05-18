'use client'

import { AdButton, useAtomicToast } from 'nucleify'

import type { NucModulesUninstallModuleInterface } from './interfaces'
import { uninstallModule } from './uninstall_module'

import './_index.scss'

export default function NucModulesSettingsUninstallModule({
  name,
  onModuleUninstalled,
}: NucModulesUninstallModuleInterface) {
  const { flashToast } = useAtomicToast()

  return (
    <AdButton
      adType="main"
      text
      rounded
      icon="prime:trash"
      className="uninstall-module-button"
      type="button"
      onClick={() =>
        void uninstallModule(name, flashToast, () => {
          onModuleUninstalled?.()
        })
      }
    />
  )
}
