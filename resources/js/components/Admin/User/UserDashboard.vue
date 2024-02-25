<template>
    <div class="card mt-1">
        <div class="card-body pt-4">
            <div class="flex justify-content-between mb-5">
                <h3>Manage Users</h3>

                <Button label="Create user" @click="openModal('create')" />
            </div>

            <DataTable
                v-bind:value="results"
                v-bind:size="'small'"
                v-bind:rows="11"
                v-bind:row-hover="true"
                v-if="results"
                paginator
                stripedRows
                @row-click="openModal('show', $event)"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <Column
                    field="id"
                    :sortable="true"
                    header="Id"
                    class="idColumn"
                />
                <Column
                    field="name"
                    :sortable="true"
                    header="Name"
                    class="nameColumn"
                />
                <Column
                    field="email"
                    :sortable="true"
                    header="Email"
                    class="emailColumn tabletColumn"
                />
                <Column
                    field="role"
                    :sortable="true"
                    header="Role"
                    class="roleColumn desktopColumn"
                />
                <Column class="w-1rem">
                    <template #body="rowData">
                        <div class="flex gap-1 justify-content-around">
                            <Button
                                class="desktopButton myButton"
                                @click="openModal('show', rowData)"
                            >
                                <i class="pi pi-eye" />
                            </Button>
                            <Button
                                class="desktopButton myButton"
                                @click="openModal('edit', rowData)"
                            >
                                <i class="pi pi-pencil" />
                            </Button>
                            <Button
                                class="desktopButton myButton"
                                @click="openModal('delete', rowData)"
                            >
                                <i class="pi pi-trash" />
                            </Button>
                            <Button class="mobileButton myButton">
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
        v-bind:visible="visibleShow"
        v-bind:user="selectedUser"
        v-bind:close="closeModal"
    />
    <CreateUser
        v-bind:visible="visibleCreate"
        v-bind:options="roleOptions"
        v-bind:flashSuccessMessage="flashSuccessMessage"
        v-bind:flashDangerMessage="flashDangerMessage"
        v-bind:flashValidationErrors="flashValidationErrors"
        v-bind:close="closeModal"
    />
    <EditUser
        v-bind:visible="visibleEdit"
        v-bind:user="selectedUser"
        v-bind:options="roleOptions"
        v-bind:flashSuccessMessage="flashSuccessMessage"
        v-bind:flashDangerMessage="flashDangerMessage"
        v-bind:flashValidationErrors="flashValidationErrors"
        v-bind:close="closeModal"
    />
    <Dialog v-model:visible="visibleDelete" modal header="Confirm delete user">
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
            />
            <Button label="Confirm" @click="deleteUser(selectedUser)" />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CreateUser from './CreateUser.vue'
import ShowUser from './ShowUser.vue'
import EditUser from './EditUser.vue'

export interface UserData {
    id: number
    name: string
    email: string
    role: string
}

const props = defineProps<{
    roleOptions: string[]
    flashSuccessMessage: (message: string) => void
    flashDangerMessage: (message: string) => void
    flashValidationErrors: (errors: Record<string, string[]>) => void
}>()

const results = ref<UserData[]>([])
const selectedUser = ref<UserData | null>(null)

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
function setSelectedUser(userData: UserData): void {
    selectedUser.value = userData
}

/**
 * Open modal function
 *
 * @param action
 * @param user
 */
function openModal(action: string, user?: UserData | undefined): void {
    if (user) {
        setSelectedUser(user)
    }

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
        })
        .catch((error) => {
            switch (error.response.status) {
                case 500:
                    props.flashDangerMessage(
                        error.response.data.error ||
                            'HTTP 500: Internal Server Error'
                    )
                    break
                case 403:
                case 401:
                    props.flashDangerMessage('Unauthorized access')
                    break
                default:
                    props.flashValidationErrors(error.response.data.errors)
            }
        })
}
function deleteUser(user: any): void {
    axios
        .delete(`/api/users/${user.data.id}`)
        .then(() => {
            let success_message = 'Successfully deleted: ' + user.data.name

            props.flashSuccessMessage(success_message)
            closeModal('delete')
            getUsers()
        })
        .catch((error) => {
            closeModal('delete')
            switch (error.response.status) {
                case 500:
                    props.flashDangerMessage(
                        error.response.data.error ||
                            'HTTP 500: Internal Server Error'
                    )
                    break
                case 403:
                case 401:
                    props.flashDangerMessage('Unauthorized access')
                    break
                default:
                    props.flashValidationErrors(error.response.data.errors)
            }
        })
}
</script>
