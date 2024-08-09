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
                <DataTable
                    :value="activities"
                    :loading="loading"
                    :size="'small'"
                    :rows="10"
                    :row-hover="true"
                    v-if="activities"
                    paginator
                    stripedRows
                    @row-click="openDialog('show', $event.data)"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                >
                    <template #loading><progress-spinner-atom /></template>
                    <Column
                        field="id"
                        :sortable="true"
                        header="ID"
                        class="idActivityColumn"
                    />
                    <Column
                        field="description"
                        :sortable="true"
                        header="Description"
                        class="descriptionColumn"
                    />
                    <Column
                        field="created_at"
                        :sortable="true"
                        header="Created At"
                        class="createdAtActivityColumn"
                    />
                    <Column class="actionColumn">
                        <template #body="row">
                            <div class="actionColumnContent">
                                <button-atom
                                    class="dataTableButton"
                                    icon="pi pi-trash"
                                    @click="openDialog('delete', row.data)"
                                    :rounded="true"
                                    :style="activityStyle"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
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

import { activityApiMethods } from '@/utils'

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
