<template>
    <Card class="myCard userDashboard mt-7">
        <template #title>
            <div class="flex justify-content-between">
                <h3>Manage Users</h3>

                <Button
                    label="New User"
                    @click="openModal('create')"
                    class="text-sm smallHeightButton"
                />
            </div>
        </template>
        <template #content="rowData">
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
                <Column class="actionColumn">
                    <template #body="rowData">
                        <div class="flex gap-1 justify-content-around">
                            <Button
                                class="desktopButton myButton"
                                icon="pi pi-eye"
                                @click="openModal('show', rowData)"
                            />
                            <Button
                                class="desktopButton myButton"
                                icon="pi pi-pencil"
                                @click="openModal('edit', rowData)"
                            />
                            <Button
                                class="desktopButton myButton"
                                icon="pi pi-trash"
                                @click="openModal('delete', rowData)"
                            />
                            <Button
                                class="mobileButton myButton"
                                icon="pi pi-bars"
                                @click="openMenu($event, rowData)"
                            />
                            <Menu
                                ref="menu"
                                :model="items"
                                :popup="true"
                                class="w-10rem"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
            <div v-else>Loading data or no data available...</div>
        </template>
    </Card>
    <ShowUser
        v-bind:visible="visibleShow"
        v-bind:user="selectedUser"
        v-bind:close="closeModal"
    />
    <CreateUser
        v-bind:getUsers="getUsers"
        v-bind:visible="visibleCreate"
        v-bind:options="roleOptions"
        v-bind:flashSuccessMessage="flashSuccessMessage"
        v-bind:flashDangerMessage="flashDangerMessage"
        v-bind:flashValidationErrors="flashValidationErrors"
        v-bind:close="closeModal"
    />
    <EditUser
        v-bind:user="selectedUser"
        v-bind:getUsers="getUsers"
        v-bind:visible="visibleEdit"
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
                class="smallHeightButton"
            />
            <Button
                label="Confirm"
                @click="deleteUser(selectedUser)"
                class="smallHeightButton"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { UserInterface } from '../../../interfaces'

import CreateUser from './CreateUser.vue'
import ShowUser from './ShowUser.vue'
import EditUser from './EditUser.vue'

const props = defineProps<{
    roleOptions: string[]
    flashSuccessMessage: (message: string) => void
    flashDangerMessage: (message: string) => void
    flashValidationErrors: (errors: Record<string, string[]>) => void
}>()

const results = ref<UserInterface[]>([])
const selectedUser = ref<UserInterface | undefined>(undefined)
const success_message = ref<string | undefined>(undefined)

const visibleShow = ref(false)
const visibleCreate = ref(false)
const visibleEdit = ref(false)
const visibleDelete = ref(false)

/**
 * Menu variables and function
 */
const menu = ref()
const items = ref([
    {
        items: [
            {
                label: 'Show',
                icon: 'pi pi-eye',
                command: () => {
                    openModal('show', selectedUser.value)
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    openModal('edit', selectedUser.value)
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    openModal('delete', selectedUser.value)
                },
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
            },
        ],
    },
])

function openMenu(event: MouseEvent, user: UserInterface): void {
    if (user) {
        setSelectedUser(user)
    }
    menu.value.toggle(event)
}

/**
 * Fetch users after component mounts
 */
onMounted(getUsers)

/**
 * Set selected user function
 *
 * @param user
 */
function setSelectedUser(user: UserInterface): void {
    selectedUser.value = user
}

/**
 * Open modal function
 *
 * @param action
 * @param user
 */
function openModal(action: string, user?: UserInterface | undefined): void {
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
            closeModal('delete')
            getUsers()
            success_message.value = 'Successfully deleted: ' + user.data.name

            props.flashSuccessMessage(success_message.value)
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
