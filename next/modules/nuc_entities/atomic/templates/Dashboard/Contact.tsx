'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'

import type { NucContactObjectInterface, NucDashboardInterface } from 'nucleify'
import {
  contactRequests,
  NucDialog,
  NucEntityDataTableCard,
  t,
  useContactFields,
  useNucDialog,
} from 'nucleify'

type ContactDashboardProps = Omit<NucDashboardInterface, 'data'> & {
  data: NucContactObjectInterface[]
}

export function NucContactDashboard({
  data,
  getData,
  loading,
}: ContactDashboardProps): JSX.Element {
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
  const { createAndEditFields, showFields } = useContactFields()
  const { deleteContact, storeContact, editContact } =
    contactRequests(closeDialog)

  const dialogs = useMemo(
    () => [
      {
        entity: 'contact',
        action: 'show',
        visible: visibleShow,
        cancelButtonLabel: t('common-close'),
        fields: showFields,
      },
      {
        entity: 'contact',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-contact-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: deleteContact,
        getData,
      },
      {
        entity: 'contact',
        action: 'create',
        visible: visibleCreate,
        title: t('entity-contact-create'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: storeContact,
        getData,
        fields: createAndEditFields,
      },
      {
        entity: 'contact',
        action: 'edit',
        visible: visibleEdit,
        title: t('entity-contact-edit'),
        confirmButtonLabel: t('common-update'),
        cancelButtonLabel: t('common-cancel'),
        confirm: editContact,
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
      deleteContact,
      storeContact,
      editContact,
      getData,
    ]
  )

  return (
    <section id="contacts">
      <NucEntityDataTableCard
        adType="contact"
        value={safeData}
        loading={loading}
        openDialog={openDialog}
        tag={3}
        headerText={t('entity-contact-manage')}
        buttonText={t('entity-contact-new')}
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
