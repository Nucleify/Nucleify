<template>
  <section id="features">
    <nuc-entity-datatable-card
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="feature"
      header-text="Manage Features"
      button-text="New Feature"
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
import { featureRequests, useFeatureFields, useNucDialog } from 'atomic'

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

const { createAndEditFields, showFields } = useFeatureFields()
const { deleteFeature, storeFeature, editFeature } =
  featureRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'feature',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'feature',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete feature?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteFeature,
    getData: props.getData,
  },
  {
    entity: 'feature',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new feature',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeFeature,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'feature',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit feature',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editFeature,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
