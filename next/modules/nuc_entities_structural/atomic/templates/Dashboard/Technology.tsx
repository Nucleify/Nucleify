'use client'

import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { NucEntityDataTableCard } from '../../../../nuc_datatable/atomic/templates/entity-datatable-card'
import { NucDialog } from '../../../../nuc_dialog'
import type { ConfirmDialogFunctionType } from '../../../../nuc_dialog/types/functions'
import { useNucDialog } from '../../../../nuc_dialog/utils/use_nuc_dialog'
import type { NucDashboardInterface } from '../../../../nuc_templates/components/dashboard/types/interfaces'
import { useTechnologyFields } from '../../bosons/constants/fields'
import type { NucTechnologyObjectInterface } from '../../bosons/types'
import { technologyRequests } from '../../bosons/utils'

export default function NucTechnologyDashboard(
  props: NucDashboardInterface
): React.JSX.Element {
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

  const { createAndEditFields, showFields } = useTechnologyFields()
  const { deleteTechnology, storeTechnology, editTechnology } =
    technologyRequests(closeDialog)

  const confirmCreate: ConfirmDialogFunctionType = async (data, getData) => {
    await storeTechnology(
      data as unknown as NucTechnologyObjectInterface,
      async () => {
        getData?.()
      }
    )
  }

  const confirmEdit: ConfirmDialogFunctionType = async (data, getData) => {
    await editTechnology(
      data as unknown as NucTechnologyObjectInterface,
      async () => {
        getData?.()
      }
    )
  }

  const confirmDelete: ConfirmDialogFunctionType = async (id, getData) => {
    if (typeof id !== 'number') return
    await deleteTechnology(id, async () => {
      getData?.()
    })
  }

  const dialogs = useMemo(
    () => [
      {
        entity: 'technology',
        action: 'show',
        visible: visibleShow,
        data: selectedObject ? [selectedObject] : undefined,
        cancelButtonLabel: t('common-close'),
        fields: showFields as unknown as Array<{
          name: string
          label: string
          type: string
          key: string
          props?: Record<string, unknown>
        }>,
      },
      {
        entity: 'technology',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-technology-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmDelete,
        getData: props.getData,
      },
      {
        entity: 'technology',
        action: 'create',
        visible: visibleCreate,
        title: t('entity-technology-create'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmCreate,
        getData: props.getData,
        fields: createAndEditFields as unknown as Array<{
          name: string
          label: string
          type: string
          key: string
          props?: Record<string, unknown>
        }>,
      },
      {
        entity: 'technology',
        action: 'edit',
        visible: visibleEdit,
        data: selectedObject ? [selectedObject] : undefined,
        title: t('entity-technology-edit'),
        confirmButtonLabel: t('common-update'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmEdit,
        getData: props.getData,
        fields: createAndEditFields as unknown as Array<{
          name: string
          label: string
          type: string
          key: string
          props?: Record<string, unknown>
        }>,
      },
    ],
    [
      createAndEditFields,
      confirmCreate,
      confirmDelete,
      confirmEdit,
      props.getData,
      selectedObject,
      showFields,
      t,
      visibleCreate,
      visibleDelete,
      visibleEdit,
      visibleShow,
    ]
  )

  return (
    <section id="questions">
      <NucEntityDataTableCard
        value={props.data as Record<string, unknown>[] | undefined}
        loading={props.loading}
        openDialog={openDialog}
        tag={3}
        adType="technology"
        headerText={t('entity-technology-manage')}
        buttonText={t('entity-technology-new')}
      />

      {dialogs.map((dialog) => (
        <NucDialog
          key={dialog.action}
          entity={dialog.entity as AdTypeType}
          action={dialog.action as ActionType}
          visible={dialog.visible}
          selectedObject={selectedObject || undefined}
          title={dialog.title}
          fields={dialog.fields}
          confirmButtonLabel={dialog.confirmButtonLabel}
          cancelButtonLabel={dialog.cancelButtonLabel}
          confirm={dialog.confirm}
          getData={dialog.getData}
          close={closeDialog}
          data={dialog.data}
          onHide={() => closeDialog(dialog.action as ActionType)}
        />
      ))}
    </section>
  )
}
