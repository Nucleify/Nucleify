'use client'

import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { NucEntityDataTableCard } from '../../../../nuc_datatable/atomic/templates/entity-datatable-card'
import { NucDialog } from '../../../../nuc_dialog'
import type { ConfirmDialogFunctionType } from '../../../../nuc_dialog/types/functions'
import { useNucDialog } from '../../../../nuc_dialog/utils/use_nuc_dialog'
import type { NucDashboardInterface } from '../../../../nuc_templates/components/dashboard/types/interfaces'
import { useQuestionFields } from '../../bosons/constants/fields'
import type { NucQuestionObjectInterface } from '../../bosons/types'
import { questionRequests } from '../../bosons/utils'

export default function NucQuestionDashboard(
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

  const { createAndEditFields, showFields } = useQuestionFields()
  const { deleteQuestion, storeQuestion, editQuestion } =
    questionRequests(closeDialog)

  const confirmCreate: ConfirmDialogFunctionType = async (data, getData) => {
    await storeQuestion(
      data as unknown as NucQuestionObjectInterface,
      async () => {
        getData?.()
      }
    )
  }

  const confirmEdit: ConfirmDialogFunctionType = async (data, getData) => {
    await editQuestion(
      data as unknown as NucQuestionObjectInterface,
      async () => {
        getData?.()
      }
    )
  }

  const confirmDelete: ConfirmDialogFunctionType = async (id, getData) => {
    if (typeof id !== 'number') return
    await deleteQuestion(id, async () => {
      getData?.()
    })
  }

  const dialogs = useMemo(
    () => [
      {
        entity: 'question',
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
        entity: 'question',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-question-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: confirmDelete,
        getData: props.getData,
      },
      {
        entity: 'question',
        action: 'create',
        visible: visibleCreate,
        title: t('entity-question-create'),
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
        entity: 'question',
        action: 'edit',
        visible: visibleEdit,
        data: selectedObject ? [selectedObject] : undefined,
        title: t('entity-question-edit'),
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
        adType="question"
        headerText={t('entity-question-manage')}
        buttonText={t('entity-question-new')}
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
