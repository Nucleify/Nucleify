<template>
  <section id="questions">
    <ad-card-data-table
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="question"
      header-text="Manage Questions"
      button-text="New Question"
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
import { questionRequests, useDialog, useQuestionFields } from 'atomic'

const props = defineProps<DashboardInterface>()

const {
  visibleShow,
  visibleCreate,
  visibleEdit,
  visibleDelete,
  selectedObject,
  openDialog,
  closeDialog,
} = useDialog()

const { createAndEditFields, showFields } = useQuestionFields()
const { deleteQuestion, storeQuestion, editQuestion } =
  questionRequests(closeDialog)

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
    getData: props.getData,
  },
  {
    entity: 'question',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new question',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeQuestion,
    getData: props.getData,
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
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
