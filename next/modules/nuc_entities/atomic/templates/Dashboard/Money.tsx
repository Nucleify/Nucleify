'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'

import type { NucDashboardInterface, NucMoneyObjectInterface } from 'nucleify'
import {
  moneyRequests,
  NucDialog,
  NucEntityDataTableCard,
  t,
  useMoneyFields,
  useNucDialog,
} from 'nucleify'

type MoneyDashboardProps = Omit<NucDashboardInterface, 'data'> & {
  data: NucMoneyObjectInterface[]
}

export function NucMoneyDashboard({
  data,
  getData,
  loading,
}: MoneyDashboardProps): JSX.Element {
  const safeData = data ?? []
  const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    openDialog,
    closeDialog,
  } = useNucDialog()
  const { createAndEditFields, showFields } = useMoneyFields()
  const { deleteMoney, storeMoney, editMoney } = moneyRequests(closeDialog)

  const dialogs = useMemo(
    () => [
      {
        entity: 'money',
        action: 'show',
        visible: visibleShow,
        cancelButtonLabel: t('common-close'),
        fields: showFields,
      },
      {
        entity: 'money',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-money-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: deleteMoney,
        getData,
      },
      {
        entity: 'money',
        action: 'create',
        visible: visibleCreate,
        title: t('entity-money-create'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: storeMoney,
        getData,
        fields: createAndEditFields,
      },
      {
        entity: 'money',
        action: 'edit',
        visible: visibleEdit,
        title: t('entity-money-edit'),
        confirmButtonLabel: t('common-update'),
        cancelButtonLabel: t('common-cancel'),
        confirm: editMoney,
        getData,
        fields: createAndEditFields,
      },
    ],
    [
      visibleShow,
      visibleCreate,
      visibleEdit,
      visibleDelete,
      showFields,
      createAndEditFields,
      deleteMoney,
      storeMoney,
      editMoney,
      getData,
    ]
  )

  return (
    <section id="money">
      <NucEntityDataTableCard
        adType="money"
        value={safeData}
        loading={loading}
        openDialog={openDialog}
        tag={3}
        headerText={t('entity-money-manage')}
        buttonText={t('entity-money-new')}
      />

      {dialogs.map((dialog) => (
        <NucDialog
          key={dialog.action}
          entity={dialog.entity as unknown as ObjectType}
          action={dialog.action as ActionType}
          visible={dialog.visible}
          selectedObject={selectedObject || undefined}
          title={dialog.title}
          fields={dialog.fields ? [...dialog.fields] : undefined}
          confirmButtonLabel={dialog.confirmButtonLabel}
          cancelButtonLabel={dialog.cancelButtonLabel}
          confirm={dialog.confirm as never}
          getData={dialog.getData}
          close={closeDialog}
        />
      ))}
    </section>
  )
}
