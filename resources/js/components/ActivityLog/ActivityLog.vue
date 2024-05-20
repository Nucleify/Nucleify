<template>
    <div class="panelContainer">
        <Card
            v-if="display.Activity"
            class="myCard lg:ml-2 lg:mr-5 lg:px-2 xl:px-4"
        >
            <template #content>
                <my-chart
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :direction="'vertical'"
                    :activity-log-data="activities"
                    :chart-class="'h-30rem'"
                />
            </template>
        </Card>
        <Card class="myCard lg:ml-2 lg:mr-5">
            <template #title>
                <div class="flex justify-content-between">
                    <h3>Activity Log</h3>
                </div>
            </template>
            <template #content>
                <DataTable
                    :value="activities"
                    :size="'small'"
                    :rows="10"
                    :row-hover="true"
                    v-if="activities"
                    paginator
                    stripedRows
                    @row-click="openModal('show', $event.data)"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                >
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
                            <div class="flex gap-1 justify-content-around">
                                <Button
                                    class="myButton activityMyButton"
                                    icon="pi pi-trash"
                                    @click="openModal('delete', row.data)"
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
    <Dialog :visible="visibleDelete" modal header="Confirm delete activity">
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
                class="smallHeightButton"
            />
            <Button
                label="Confirm"
                @click="
                    deleteActivity(
                        selectedObject.id,
                        getAllActivities,
                        closeModal
                    )
                "
                class="smallHeightButton"
                :style="activityStyle"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { MyChart } from '@/components'
import { handleStyles } from '@/constants'
import { activityApiMethods, useDisplayCharts, useMenuAndModal } from '@/utils'

const { display } = useDisplayCharts()
const { visibleDelete, selectedObject, openModal, closeModal } =
    useMenuAndModal()

const {
    results: activities,
    getAllActivities,
    deleteActivity,
} = activityApiMethods()

const { activityStyle } = handleStyles()

onMounted(getAllActivities)
</script>
