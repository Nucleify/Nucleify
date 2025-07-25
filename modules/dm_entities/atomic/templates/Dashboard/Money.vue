<template>
  <section id="money">
    <ad-card-data-table
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="money"
      header-text="Manage Money"
      button-text="New Transaction"
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
import { moneyRequests, useDialog, useMoneyFields } from 'atomic'

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

const { createAndEditFields, showFields } = useMoneyFields()
const { deleteMoney, storeMoney, editMoney } = moneyRequests(closeDialog)

const dialogs = computed(() => [
  {
    entity: 'money',
    action: 'show',
    visible: visibleShow.value,
    data: selectedObject.value,
    cancelButtonLabel: 'Close',
    fields: showFields,
  },
  {
    entity: 'money',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete transaction?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteMoney,
    getData: props.getData,
  },
  {
    entity: 'money',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new transaction',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeMoney,
    getData: props.getData,
    fields: createAndEditFields,
  },
  {
    entity: 'money',
    action: 'edit',
    visible: visibleEdit.value,
    data: selectedObject.value,
    title: 'Edit transaction',
    confirmButtonLabel: 'Update',
    cancelButtonLabel: 'Cancel',
    confirm: editMoney,
    getData: props.getData,
    fields: createAndEditFields,
  },
])
</script>
