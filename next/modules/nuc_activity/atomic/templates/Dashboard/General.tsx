'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'

import {
  activityRequests,
  type NucActivityObjectInterface,
  type NucDashboardInterface,
  NucDialog,
  NucEntityDataTableCard,
  t,
  useNucDialog,
} from 'nucleify'

type ActivityDashboardProps = Omit<NucDashboardInterface, 'data'> & {
  data: NucActivityObjectInterface[]
}

export function NucActivityDashboard({
  data,
  getData,
  loading,
}: ActivityDashboardProps): JSX.Element {
  const safeData = data ?? []
  const { visibleDelete, selectedObject, openDialog, closeDialog } =
    useNucDialog()
  const { deleteActivity } = activityRequests(closeDialog)

  const dialogs = useMemo(
    () => [
      {
        entity: 'activity',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-activity-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: deleteActivity,
        getData,
      },
    ],
    [visibleDelete, deleteActivity, getData]
  )

  return (
    <section id="activity-log">
      <NucEntityDataTableCard
        adType="activity"
        value={safeData}
        loading={loading}
        openDialog={openDialog}
        tag={3}
        headerText={t('entity-activity-manage')}
      />

      {dialogs.map((dialog) => (
        <NucDialog
          key={dialog.action}
          entity="activity"
          action={dialog.action as ActionType}
          visible={dialog.visible}
          selectedObject={selectedObject || undefined}
          title={dialog.title}
          confirmButtonLabel={dialog.confirmButtonLabel}
          cancelButtonLabel={dialog.cancelButtonLabel}
          confirm={dialog.confirm as never}
          getData={dialog.getData}
          close={closeDialog}
          onHide={() => closeDialog(dialog.action as ActionType)}
        />
      ))}
    </section>
  )
}
