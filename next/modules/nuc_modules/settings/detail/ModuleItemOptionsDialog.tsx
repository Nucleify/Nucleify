'use client'

import { useMemo } from 'react'

import { AdButton, AdDialog } from 'nucleify'

import type { ModuleItemOptionsDialogProps } from './types'

import './_module_item_options_dialog.scss'

export function ModuleItemOptionsDialog({
  visible,
  onHide,
  name,
  enabled,
  action,
  onConfirm,
}: ModuleItemOptionsDialogProps) {
  const config = useMemo(() => {
    if (action === 'uninstall') {
      return {
        header: 'Confirm Uninstall',
        actionVerb: 'uninstall',
        label: 'Uninstall',
        icon: 'prime:trash',
      }
    }
    return {
      header: enabled ? 'Confirm Disable' : 'Confirm Enable',
      actionVerb: enabled ? 'disable' : 'enable',
      label: enabled ? 'Disable' : 'Enable',
      icon: enabled ? 'prime:times-circle' : 'prime:check-circle',
    }
  }, [action, enabled])

  async function handleConfirm(): Promise<void> {
    await onConfirm()
    onHide()
  }

  return (
    <AdDialog
      visible={visible}
      onHide={onHide}
      modal
      header={config.header}
      className="modules-settings-options-dialog"
      footer={
        <>
          <AdButton
            label="Cancel"
            icon="prime:times"
            severity="secondary"
            text
            rounded
            type="button"
            onClick={onHide}
          />
          <AdButton
            label={config.label}
            icon={config.icon}
            adType="main"
            text
            rounded
            type="button"
            onClick={() => void handleConfirm()}
          />
        </>
      }
    >
      <p>
        Are you sure you want to {config.actionVerb} <strong>{name}</strong>?
      </p>
    </AdDialog>
  )
}
