<template>
  <section id="questions">
    <nuc-entity-datatable-card
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="technology"
      header-text="Manage Technologies"
      button-text="New Technology"
    />

    <nuc-dialog
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

import type { NucDashboardInterface } from 'atomic'
import { technologyRequests, useNucDialog, useTechnologyFields } from 'atomic'

const props = defineProps<NucDashboardInterface>()

const {
  visibleShow,
  visibleCreate,
  visibleEdit,
  visibleDelete,
  selectedObject,
  openDialog,
  closeDialog,
} = useNucDialog()

const { createAndEditFields, showFields } = useTechnologyFields()
const { deleteTechnology, storeTechnology, editTechnology } =
  technologyRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'technology',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'technology',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete technology?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteTechnology,
    getData: props.getData,
  },
  {
    entity: 'technology',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new technology',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeTechnology,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'technology',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit technology',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editTechnology,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
