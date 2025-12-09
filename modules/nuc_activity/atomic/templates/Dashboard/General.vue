<template>
  <section id="activity-log">
    <dm-entity-datatable-card
      ad-type="activity"
      :value="props.data"
      :loading="props.loading"
      :open-dialog="openDialog"
      :tag="3"
      header-text="Manage Activities"
    />

    <dm-dialog
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
import type { DashboardInterface } from 'atomic'
import { activityRequests, useDmDialog } from 'atomic'

const props = defineProps<DashboardInterface>()

const { visibleDelete, selectedObject, openDialog, closeDialog } = useDmDialog()

const { deleteActivity } = activityRequests(closeDialog)

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
    getData: props.getData,
  },
])
</script>
