<template>
    <Card class="myCard activityLogDashboard w-full mt-7 lg:mt-1 lg:ml-2 lg:mr-5">
        <template #title>
            <div class="flex justify-content-between">
                <h3>Activity Log</h3>
            </div>
        </template>
        <template #content>
            <DataTable
                v-bind:value="activityLogs"
                v-bind:size="'small'"
                v-bind:rows="10"
                v-bind:row-hover="true"
                v-if="activityLogs"
                paginator
                stripedRows
                @row-click="openModal('show', $event)"
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
                    <template #body="rowData">
                        <div class="flex gap-1 justify-content-around">
                            <Button
                                class="myButton activityMyButton"
                                icon="pi pi-trash"
                                @click="openModal('delete', rowData)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
            <div v-else>Loading data or no data available...</div>
        </template>
    </Card>
    <Dialog :visible="visibleDelete" modal header="Confirm delete activity log">
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
                class="smallHeightButton"
            />
            <Button
                label="Confirm"
                @click="deleteActivityLog(selectedLog)"
                class="smallHeightButton"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { ActivityLogInterface } from '../../interfaces'
import { useApiErrors, useFlashToast } from '../../utils'

const { flashToast } = useFlashToast()
const { apiErrors } = useApiErrors()

const activityLogs = ref<ActivityLogInterface[]>([])
const selectedLog = ref<ActivityLogInterface | null>(null)
const visibleDelete = ref(false)

onMounted(getActivityLogs)

function getActivityLogs(): void {
    axios
        .get('/api/activity-log')
        .then((response) => {
            activityLogs.value = response.data
        })
        .catch((error) => {
            apiErrors(error)
        })
}

function openModal(action: string, log: any): void {
    selectedLog.value = log.data
    visibleDelete.value = true
}

function closeModal(action: string): void {
    switch (action) {
        case 'delete':
            visibleDelete.value = false
            break
        default:
            console.error('Invalid action:', action)
            break
    }
}

function deleteActivityLog(log: any): void {
    axios
        .delete(`/api/activity-log/${log.id}`)
        .then((response) => {
            closeModal('delete')
            getActivityLogs()

            console.log(response.data)
            flashToast(response.data.message, 'success')
        })
        .catch((error) => {
            closeModal('delete')
            apiErrors(error)
        })
}
</script>
