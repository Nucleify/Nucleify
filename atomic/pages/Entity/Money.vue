<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Money"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :money-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <ad-card-data-table
      :value="results"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      ad-type="money"
      headerText="Manage Money"
      buttonText="New Money"
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

import { useMoneyFields } from 'atomic/bosons/constants'
import { moneyRequests, useDialog, useDisplayCharts } from 'atomic/bosons/utils'

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

const { createAndEditFields, showFields } = useMoneyFields()
const { loading, results, getAllMoney, storeMoney, editMoney, deleteMoney } =
  moneyRequests(closeDialog)

onMounted(() => {
  getAllMoney(true)
})

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
    getData: getAllMoney,
  },
  {
    entity: 'money',
    action: 'create',
    visible: visibleCreate.value,
    title: 'Create new transaction',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: storeMoney,
    getData: getAllMoney,
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
    getData: getAllMoney,
    fields: createAndEditFields,
  },
])
</script>

<style scoped>
:deep(.p-progress-spinner-circle) {
  stroke: var(--money-item-color);
  animation: p-progress-spinner-dash 1.2s ease-in-out infinite;
}
</style>
