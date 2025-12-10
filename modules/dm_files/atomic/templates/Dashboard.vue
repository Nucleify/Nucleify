<template>
  <section id="files">
    <nuc-entity-datatable-card
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="file"
      header-text="Manage Files"
      button-text="New File"
    />

    <dm-dialog
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
import { fileRequests, useDmDialog, useFileFields } from 'atomic'

const props = defineProps<DashboardInterface>()

const {
  visibleShow,
  visibleCreate,
  visibleEdit,
  visibleDelete,
  selectedObject,
  openDialog,
  closeDialog,
} = useDmDialog()

const { createAndEditFields, showFields } = useFileFields()
const { deleteFile, storeFile, editFile } = fileRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'file',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'file',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete file?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteFile,
    getData: props.getData,
  },
  {
    entity: 'file',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new file',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeFile,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'file',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit file',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editFile,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
