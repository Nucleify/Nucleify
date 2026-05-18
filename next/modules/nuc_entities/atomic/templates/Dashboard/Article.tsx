'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'

import type { NucArticleObjectInterface, NucDashboardInterface } from 'nucleify'
import {
  articleRequests,
  NucDialog,
  NucEntityDataTableCard,
  t,
  useArticleFields,
  useNucDialog,
} from 'nucleify'

type ArticleDashboardProps = Omit<NucDashboardInterface, 'data'> & {
  data: NucArticleObjectInterface[]
}

export function NucArticleDashboard({
  data,
  getData,
  loading,
}: ArticleDashboardProps): JSX.Element {
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
  const { createAndEditFields, showFields } = useArticleFields()
  const { deleteArticle, storeArticle, editArticle } =
    articleRequests(closeDialog)

  const dialogs = useMemo(
    () => [
      {
        entity: 'article',
        action: 'show',
        visible: visibleShow,
        cancelButtonLabel: t('common-close'),
        fields: showFields,
      },
      {
        entity: 'article',
        action: 'delete',
        visible: visibleDelete,
        title: t('entity-article-delete'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: deleteArticle,
        getData,
      },
      {
        entity: 'article',
        action: 'create',
        visible: visibleCreate,
        title: t('entity-article-create'),
        confirmButtonLabel: t('common-confirm'),
        cancelButtonLabel: t('common-cancel'),
        confirm: storeArticle,
        getData,
        fields: createAndEditFields,
      },
      {
        entity: 'article',
        action: 'edit',
        visible: visibleEdit,
        title: t('entity-article-edit'),
        confirmButtonLabel: t('common-update'),
        cancelButtonLabel: t('common-cancel'),
        confirm: editArticle,
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
      deleteArticle,
      storeArticle,
      editArticle,
      getData,
    ]
  )

  return (
    <section id="articles">
      <NucEntityDataTableCard
        adType="article"
        value={safeData}
        loading={loading}
        openDialog={openDialog}
        tag={3}
        headerText={t('entity-article-manage')}
        buttonText={t('entity-article-new')}
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
