<template>
  <section id="activity-log">
    <ad-card-data-table
      ad-type="activity"
      :value="data"
      :loading="loading"
      :open-dialog="openDialog"
      :tag="3"
      header-text="Manage Activities"
    />

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
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { DashboardInterface } from 'atomic'
import { activityRequests, useDialog } from 'atomic'

defineProps<DashboardInterface>()

const { visibleDelete, selectedObject, openDialog, closeDialog } = useDialog()

const { deleteActivity, getAllActivities } = activityRequests(closeDialog)

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
