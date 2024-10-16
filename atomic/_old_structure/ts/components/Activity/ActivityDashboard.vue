<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Activity"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="'vertical'"
      :activity-log-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <ad-card-data-table
      :value="results"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      type="activity"
      headerText="Manage Activities"
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
    :confirm-button-label="dialog.confirmButtonLabel"
    :cancel-button-label="dialog.cancelButtonLabel"
    :confirm="dialog.confirm"
    :get-data="dialog.getData"
    :close="closeDialog"
  />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import {
  activityRequests,
  useDialog,
  useDisplayCharts,
} from 'atomic/bosons/utils'

const { visibleDelete, selectedObject, openDialog, closeDialog } = useDialog()
const { display } = useDisplayCharts()

const { results, loading, getAllActivities, deleteActivity } =
  activityRequests(closeDialog)

onMounted(() => {
  getAllActivities(true)
})

const dialogs = computed(() => [
  {
    entity: 'activity',
    action: 'delete',
    visible: visibleDelete.value,
    selectedObject: selectedObject.value,
    title: 'Delete activity?',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
    confirm: deleteActivity,
    getData: getAllActivities,
  },
])
</script>

<style scoped>
:deep(.p-progress-spinner-circle) {
  stroke: var(--activity-item-color);
  animation: p-progress-spinner-dash 1.2s ease-in-out infinite;
}
</style>
