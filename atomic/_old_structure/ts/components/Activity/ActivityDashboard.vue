<template>
    <div class="panelContainer">
        <Card v-if="display.Activity" class="myCard chartCard annualChartCard">
            <template #content>
                <chart-organism
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :direction="'vertical'"
                    :activity-log-data="activities"
                    :chart-class="'h-30rem'"
                />
                <progress-spinner-atom v-if="loading" />
            </template>
        </Card>
        <Card class="myCard">
            <template #title>
                <div class="myCardHeaderContainer">
                    <heading-atom :tag="3" text="Activity Log" class="-mb-2" />
                </div>
            </template>
            <template #content>
                <data-table-organism
                    v-if="activities"
                    :data="activities"
                    :open-menu="openMenu"
                    :open-dialog="openDialog"
                    :styles="activityStyle"
                    type="activity"
                    :loading="loading"
                />
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>
    </div>
    <dialog-organism
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
        :style="activityStyle"
    />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { activityApiMethods, openMenu } from '@/utils'

import { handleStyles } from 'atomic/bosons/constants'
import { useDialog, useDisplayCharts } from 'atomic/bosons/utils'

const { visibleDelete, selectedObject, openDialog, closeDialog } = useDialog()
const { display } = useDisplayCharts()

const {
    results: activities,
    loading,
    getAllActivities,
    deleteActivity,
} = activityApiMethods()
const { activityStyle } = handleStyles()

onMounted(() => {
    getAllActivities(500)
})

const dialogs = computed(() => [
    {
        entity: 'user',
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
