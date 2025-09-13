<template>
  <section id="articles">
    <dm-entity-datatable-card
      ad-type="article"
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      :headerText="t('admin.sections.article.header')"
      buttonText="New Article"
    />

    <ad-dialog
      v-for="dialog in dialogs"
      :key="dialog.action"
      :entity="dialog.entity"
      :action="dialog.action"
      :visible="dialog.visible"
      :selected-object="selectedObject"
      :title="dialog.title"
      :fields="dialog.fields"
      :confirm-button-label="dialog.confirmButtonLabel"
      :cancel-button-label="dialog.cancelButtonLabel"
      :confirm="dialog.confirm"
      :get-data="dialog.getData"
      :close="closeDialog"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { DashboardInterface } from 'atomic'
import { articleRequests, useArticleFields, useDialog } from 'atomic'

const props = defineProps<DashboardInterface>()

const { t } = useI18n()

const {
  visibleShow,
  visibleCreate,
  visibleEdit,
  visibleDelete,
  selectedObject,
  openDialog,
  closeDialog,
} = useDialog()

const { createAndEditFields, showFields } = useArticleFields()
const { deleteArticle, storeArticle, editArticle } =
  articleRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'article',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'article',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: t('admin.dialogs.delete.headers.article'),
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteArticle,
    getData: props.getData,
  },
  {
    entity: 'article',
    action: 'create',
    visible: visibleCreate.value,
    title: t('admin.dialogs.create.headers.article'),
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeArticle,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'article',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: t('admin.dialogs.edit.headers.article'),
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editArticle,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
