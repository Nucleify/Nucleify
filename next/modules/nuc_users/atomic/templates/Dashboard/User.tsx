'use client'

import type { DataTableValue } from 'primereact/datatable'
import type { JSX } from 'react'
import { useMemo, useState } from 'react'

import { AdButton, AdDialog, userRequests, useUserFields } from 'nucleify'

import { useTranslation } from 'react-i18next'
import { NucEntityDataTableCard } from '../../../../nuc_datatable/atomic/templates/entity-datatable-card'
import { useNucDialog } from '../../../../nuc_dialog/utils/use_nuc_dialog'

type NucDashboardProps = {
  data?: DataTableValue[]
  loading?: boolean
  getData: () => Promise<void>
}

type FieldType = {
  name: string
  key: string
  label: string
  type: string
  props?: Record<string, unknown>
}

type NucUsersSafeDialogProps = {
  visible: boolean
  action: string
  title?: string
  selectedObject?: Record<string, unknown>
  fields: FieldType[]
  cancelButtonLabel?: string
  confirmButtonLabel?: string
  confirm?: (value: unknown, getData?: () => Promise<void>) => Promise<void>
  getData?: () => Promise<void>
  closeDialog: (action: ActionType) => void
  t: (key: string) => string
}

export function NucUserDashboard({
  data = [],
  loading = false,
  getData,
}: NucDashboardProps): JSX.Element {
  const { t } = useTranslation()
  const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    openDialog,
    closeDialog,
  } = useNucDialog()

  const { createFields, editFields, showFields } = useUserFields()
  const { deleteUser, storeUser, editUser } = userRequests(closeDialog)

  const dialogs = useMemo(
    () => [
      {
        entity: 'user',
        action: 'show',
        visible: visibleShow,
        cancelButtonLabel: 'Close',
        fields: showFields,
      },
      {
        entity: 'user',
        action: 'delete',
        visible: visibleDelete,
        title: 'Delete user?',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: deleteUser,
        getData,
      },
      {
        entity: 'user',
        action: 'create',
        visible: visibleCreate,
        title: 'Create new user',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: storeUser,
        getData,
        fields: createFields,
      },
      {
        entity: 'user',
        action: 'edit',
        visible: visibleEdit,
        title: 'Edit user',
        confirmButtonLabel: 'Update',
        cancelButtonLabel: 'Cancel',
        confirm: editUser,
        getData,
        fields: editFields,
      },
    ],
    [
      createFields,
      deleteUser,
      editFields,
      editUser,
      getData,
      showFields,
      storeUser,
      visibleCreate,
      visibleDelete,
      visibleEdit,
      visibleShow,
    ]
  )

  return (
    <section id="users">
      <NucEntityDataTableCard
        adType="user"
        value={data}
        loading={loading}
        openDialog={openDialog}
        tag={3}
        headerText="Manage Users"
        buttonText="New User"
      />

      {dialogs.map((dialog) => (
        <NucUsersSafeDialog
          key={dialog.action}
          visible={dialog.visible}
          action={dialog.action}
          title={dialog.title}
          selectedObject={selectedObject as Record<string, unknown> | undefined}
          fields={(dialog.fields as FieldType[]) ?? []}
          cancelButtonLabel={dialog.cancelButtonLabel}
          confirmButtonLabel={dialog.confirmButtonLabel}
          confirm={
            dialog.confirm as unknown as (
              value: unknown,
              getData?: () => Promise<void>
            ) => Promise<void>
          }
          getData={dialog.getData}
          closeDialog={closeDialog}
          t={t}
        />
      ))}
    </section>
  )
}

function NucUsersSafeDialog({
  visible,
  action,
  title,
  selectedObject,
  fields,
  cancelButtonLabel,
  confirmButtonLabel,
  confirm,
  getData,
  closeDialog,
  t,
}: NucUsersSafeDialogProps): JSX.Element {
  const [formData, setFormData] = useState<Record<string, unknown>>({})

  async function onConfirm(): Promise<void> {
    if (!confirm) return

    if (action === 'delete') {
      await confirm(selectedObject?.id, getData)
      return
    }

    await confirm(formData, getData)
  }

  return (
    <AdDialog
      visible={visible}
      onHide={() => closeDialog(action as ActionType)}
      modal
      dismissableMask
      draggable={false}
      showHeader
      header={title}
      footer={
        <div className="dialog-buttons-container">
          <AdButton
            label={cancelButtonLabel || 'Cancel'}
            severity="secondary"
            onClick={() => closeDialog(action as ActionType)}
          />
          {confirm && (
            <AdButton
              adType="main"
              label={confirmButtonLabel || 'Confirm'}
              onClick={() => void onConfirm()}
            />
          )}
        </div>
      }
    >
      {action === 'show' && selectedObject && (
        <div className="show-data-container">
          {fields.map((field) => (
            <div key={field.key}>
              <h5>{t(field.label)}</h5>
              <div>{String(selectedObject[field.key] ?? '')}</div>
            </div>
          ))}
        </div>
      )}

      {(action === 'create' || action === 'edit') && (
        <form className="form-container" action="#">
          {fields.map((field) => (
            <div key={field.name} className="form-div">
              <label htmlFor={field.name}>{t(field.label)}</label>
              <input
                id={field.name}
                value={String(
                  formData[field.name] ?? selectedObject?.[field.name] ?? ''
                )}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: event.target.value,
                  }))
                }
              />
            </div>
          ))}
        </form>
      )}

      {action === 'delete' && <p>{t('profile-delete-confirm')}</p>}
    </AdDialog>
  )
}
