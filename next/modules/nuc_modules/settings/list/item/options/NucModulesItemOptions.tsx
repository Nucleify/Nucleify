'use client'

import { useRouter } from 'next/navigation'
import type { MenuItem } from 'primereact/menuitem'
import { useCallback, useMemo, useState } from 'react'

import { AdButton, AdIcon, AdSpeedDial, useAtomicToast } from 'nucleify'

import type { ModuleObjectInterface } from '../../../../types/interfaces'
import { ModuleItemOptionsDialog } from '../../../detail/ModuleItemOptionsDialog'
import type { ModuleDialogAction } from '../../../detail/types'
import { toggleModule } from '../../../toggle/toggle_module'
import { uninstallModule } from '../../../uninstall/uninstall_module'

import './_index.scss'

export interface NucModulesItemOptionsProps extends ModuleObjectInterface {
  onModuleToggled?: () => void
  onModuleUninstalled?: () => void
}

export function NucModulesItemOptions({
  name,
  enabled,
  onModuleToggled,
  onModuleUninstalled,
}: NucModulesItemOptionsProps) {
  const router = useRouter()
  const { flashToast } = useAtomicToast()

  const [dialogVisible, setDialogVisible] = useState(false)
  const [currentAction, setCurrentAction] =
    useState<ModuleDialogAction>('uninstall')

  const openDialog = useCallback((action: ModuleDialogAction) => {
    setCurrentAction(action)
    setDialogVisible(true)
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!name) {
      flashToast('Module name is required', 'error')
      return
    }

    if (currentAction === 'uninstall') {
      await uninstallModule(name, flashToast, () => {
        onModuleUninstalled?.()
      })
      return
    }

    await toggleModule(name, enabled, flashToast, () => {
      onModuleToggled?.()
    })
  }, [
    currentAction,
    enabled,
    flashToast,
    name,
    onModuleToggled,
    onModuleUninstalled,
  ])

  const model: MenuItem[] = useMemo(
    () => [
      {
        label: 'Show',
        icon: <AdIcon icon="prime:info-circle" />,
        command: () => {
          void router.push(`/settings#module-${name}`)
        },
      },
      {
        label: enabled ? 'Disable' : 'Enable',
        icon: (
          <AdIcon
            icon={enabled ? 'prime:times-circle' : 'prime:check-circle'}
          />
        ),
        command: () => openDialog('toggle'),
      },
      {
        label: 'Uninstall',
        icon: <AdIcon icon="prime:trash" />,
        command: () => openDialog('uninstall'),
      },
    ],
    [enabled, name, openDialog, router]
  )

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      role="presentation"
    >
      <AdSpeedDial
        model={model}
        direction="left"
        className="modules-settings-options"
        buttonTemplate={(opts) => (
          <AdButton
            text
            rounded
            icon="prime:ellipsis-h"
            adType={enabled ? 'main' : undefined}
            severity={enabled ? undefined : 'secondary'}
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              opts.onClick?.(event)
            }}
          />
        )}
      />

      <ModuleItemOptionsDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        name={name}
        enabled={enabled}
        action={currentAction}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
