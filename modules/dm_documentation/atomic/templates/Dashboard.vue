<template>
  <section id="documentation">
    <ad-card-data-table
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="documentation"
      header-text="Manage Documentation"
      button-text="New Documentation"
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
import {
  documentationRequests,
  useDialog,
  useDocumentationFields,
} from 'atomic'

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

const { createAndEditFields, showFields } = useDocumentationFields()
const { deleteDocumentation, storeDocumentation, editDocumentation } =
  documentationRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'documentation',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'documentation',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete documentation?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteDocumentation,
    getData: props.getData,
  },
  {
    entity: 'documentation',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new documentation',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeDocumentation,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'documentation',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit documentation',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editDocumentation,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
