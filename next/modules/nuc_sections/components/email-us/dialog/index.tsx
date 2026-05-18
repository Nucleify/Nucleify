'use client'

import { type JSX, type ReactNode, useMemo, useState } from 'react'

import { NucSubmitButton, t } from 'nucleify'

import { AdDialog } from '../../../../../atomic/organism/dialog'
import { NucSectionEmailUs } from '..'
import type { NucEmailUsDialogPropsInterface } from './types'

const SECTION_EMAIL_DIALOG_CLASS = 'section-email-us-dialog'

const emailDialogClosePt = {
  closeButton: {
    root: { 'ad-type': 'main' as const },
  },
}

export interface NucEmailUsDialogFrameProps {
  visible: boolean
  onHide: () => void
  children: ReactNode
  dialogClassName?: string
  header?: ReactNode
}

export function NucEmailUsDialogFrame({
  visible,
  onHide,
  children,
  dialogClassName,
  header,
}: NucEmailUsDialogFrameProps): JSX.Element {
  const rootClassName =
    dialogClassName?.trim() + ' ' + SECTION_EMAIL_DIALOG_CLASS

  return (
    <AdDialog
      visible={visible}
      modal
      dismissableMask
      draggable={false}
      className={rootClassName}
      header={header}
      showHeader
      onHide={onHide}
      pt={emailDialogClosePt}
    >
      {children}
    </AdDialog>
  )
}

export function NucSectionEmailUsDialog({
  buttonLabel = '',
  buttonClass = '',
  buttonIcon = 'mdi:message-text-outline',
}: NucEmailUsDialogPropsInterface): JSX.Element {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <NucSubmitButton
        className={buttonClass}
        icon={buttonIcon}
        label={buttonLabel || t('form-get-in-touch')}
        variant="primary"
        onClick={() => setShowDialog(true)}
      />

      <NucEmailUsDialogFrame
        visible={showDialog}
        onHide={() => setShowDialog(false)}
      >
        <NucSectionEmailUs
          onSuccess={() => setShowDialog(false)}
          cardClassName="p-card"
        />
      </NucEmailUsDialogFrame>
    </>
  )
}
