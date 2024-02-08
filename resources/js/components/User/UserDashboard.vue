<template>
    <div class="card mt-1">
        <div class="card-body pt-4">
            <div class="flex justify-content-between mb-5">
                <h3>Manage Users</h3>

                <Button
                    label="Create user"
                    @click="openModal('create')"
                />
            </div>

            <DataTable
                :value="results"
                v-if="results"
                paginator
                :rows="11"
                stripedRows
                :row-hover="true"
                :size="'small'"
                @row-click="openModal('show', $event)"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <Column
                    field="id"
                    :sortable="true"
                    header="Id"
                />
                <Column
                    field="name"
                    :sortable="true"
                    header="Name"
                />
                <Column
                    field="email"
                    :sortable="true"
                    header="Email"
                    class="tabletColumn"
                />
                <Column
                    field="role"
                    :sortable="true"
                    header="Role"
                    class="desktopColumn"
                />
                <Column class="w-1rem">
                    <template #body="rowData">
                        <div class="flex gap-1 justify-content-around">
                            <Button
                                class="desktopButton contactButton"
                                @click="openModal('show', rowData)"
                            >
                                <i class="pi pi-eye" />
                            </Button>
                            <Button
                                class="desktopButton contactButton"
                                @click="openModal('edit', rowData)"
                            >
                                <i class="pi pi-pencil" />
                            </Button>
                            <Button
                                class="desktopButton contactButton"
                                @click="openModal('delete', rowData)"
                            >
                                <i class="pi pi-trash" />
                            </Button>
                            <Button class="mobileButton contactButton">
                                <i class="pi pi-bars" />
                            </Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
            <div v-else>Loading data or no data available...</div>
        </div>
    </div>
    <ShowUser
        :visible="visibleShow"
        :user="selectedUser"
        :close="closeModal"
    />
    <CreateUser
        :visible="visibleCreate"
        :options="options"
        :close="closeModal"
        :errors="errors"
        :flashValidationErrors="flashValidationErrors"
    />
    <EditUser
        :visible="visibleEdit"
        :user="selectedUser"
        :options="options"
        :close="closeModal"
        :errors="errors"
        :flashValidationErrors="flashValidationErrors"
    />
    <Dialog v-model:visible="visibleDelete" modal header="Confirm delete user">
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
            />
            <Button
                label="Confirm"
                @click="deleteUser(selectedUser)"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CreateUser from './CreateUser.vue'
import ShowUser from './ShowUser.vue'
import EditUser from './EditUser.vue'

interface UserData {
    id: number
    name: string
    email: string
    role: string
}

const results = ref<any>(null)
const selectedUser = ref<UserData | null>(null)
const options = ['user', 'admin']
const errors = ref<string[]>([])

const visibleShow = ref(false)
const visibleCreate = ref(false)
const visibleEdit = ref(false)
const visibleDelete = ref(false)


/**
 * Fetch users after component mounts
 */
onMounted(getUsers)

/**
 * Set selected user function
 *
 * @param userData
 */
function setSelectedUser(userData: any): void {
    selectedUser.value = userData
}

/**
 * Open modal function
 *
 * @param action
 * @param contactData
 */
function openModal(action: string, contactData?: any): void {
    setSelectedUser(contactData)

    switch (action) {
        case 'show':
            visibleShow.value = true
            break
        case 'create':
            visibleCreate.value = true
            break
        case 'edit':
            visibleEdit.value = true
            break
        case 'delete':
            visibleDelete.value = true
            break
        default:
            console.error('Invalid action:', action)
            break
    }
}

/**
 * Close modal function
 *
 * @param action
 */
function closeModal(action: string): void {
    switch (action) {
        case 'show':
            visibleShow.value = false
            break
        case 'create':
            visibleCreate.value = false
            break
        case 'edit':
            visibleEdit.value = false
            break
        case 'delete':
            visibleDelete.value = false
            break
        default:
            console.error('Invalid action:', action)
            break
    }
}

/**
 * HTTP requests functions
 */
function getUsers(): void {
    axios
        .get('/api/users')
        .then((response) => {
            results.value = response.data
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}
function deleteUser(user: any): void {
    axios
        .delete(`/api/users/${user.data.id}`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            visibleDelete.value = false
            getUsers()
        })
}

/**
 * Flash validation errors function
 *
 * @param errorsData
 */
function flashValidationErrors(errorsData: Record<string, string[]>): void {
    for (const value in errorsData) {
        if (Object.prototype.hasOwnProperty.call(errorsData, value)) {
            errors.value.push(...errorsData[value])
        }
    }
    setTimeout(() => {
        errors.value = []
    }, 5000)
}
</script>
