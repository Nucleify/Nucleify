<template>
  <div class="panel-container">
    <ad-cart-chart
      v-if="display.Question"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :question-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <ad-card-data-table
      :value="results"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="question"
      headerText="Manage Questions"
      buttonText="New Question"
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

import {
  useQuestionFields,
  questionRequests,
  useDialog,
  useDisplayCharts,
} from 'atomic'

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

const { createAndEditFields, showFields } = useQuestionFields()

const {
  results,
  loading,
  getAllQuestions,
  storeQuestion,
  editQuestion,
  deleteQuestion,
} = questionRequests(closeDialog)

onMounted(() => {
  getAllQuestions(true)
})

const dialogs = computed(() => [
  {
    entity: 'question',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'question',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete question?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteQuestion,
    getData: getAllQuestions,
  },
  {
    entity: 'question',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new question',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeQuestion,
    getData: getAllQuestions,
    fields: createAndEditFields,
  },
  {
    entity: 'question',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit question',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editQuestion,
    getData: getAllQuestions,
    fields: createAndEditFields,
  },
])
</script>

<style scoped>
:deep(.p-progress-spinner-circle) {
  stroke: var(--question-item-color);
  animation: p-progress-spinner-dash 1.2s ease-in-out infinite;
}
</style>
