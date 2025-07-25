<template>
  <section id="cards">
    <ad-card-data-table
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="card"
      header-text="Manage Cards"
      button-text="New Card"
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
import { cardRequests, useCardFields, useDialog } from 'atomic'

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

const { createAndEditFields, showFields } = useCardFields()
const { deleteCard, storeCard, editCard } = cardRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'card',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'card',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete card?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteCard,
    getData: props.getData,
  },
  {
    entity: 'card',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new card',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeCard,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'card',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit card',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editCard,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
