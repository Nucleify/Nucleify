<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Article"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="'vertical'"
      :article-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <ad-card-data-table
      :value="results"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      type="article"
      headerText="Manage Articles"
    />
  </div>

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
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

import { useArticleFields } from 'atomic/bosons/constants'
import {
  articleRequests,
  useDialog,
  useDisplayCharts,
} from 'atomic/bosons/utils'

const {
  visibleShow,
  visibleCreate,
  visibleEdit,
  visibleDelete,
  selectedObject,
  openDialog,
  closeDialog,
} = useDialog()
const { display } = useDisplayCharts()

const { createAndEditFields, showFields } = useArticleFields()
const {
  results,
  loading,
  getAllArticles,
  storeArticle,
  editArticle,
  deleteArticle,
} = articleRequests(closeDialog)

onMounted(() => {
  getAllArticles(true)
})

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
    title: 'Delete article?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteArticle,
    getData: getAllArticles,
  },
  {
    entity: 'article',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new article',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeArticle,
    getData: getAllArticles,
    fields: createAndEditFields,
  },
  {
    entity: 'article',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit article',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editArticle,
    getData: getAllArticles,
    fields: createAndEditFields,
  },
])
</script>

<style scoped>
:deep(.p-progress-spinner-circle) {
  stroke: var(--article-item-color);
  animation: p-progress-spinner-dash 1.2s ease-in-out infinite;
}
</style>
