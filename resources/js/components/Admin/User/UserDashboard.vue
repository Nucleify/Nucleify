<template>
    <Card class="myCard lg:ml-2 lg:mr-5">
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
        <template #content="row">
            <DataTable
                v-bind:value="data"
                v-bind:size="'small'"
                v-bind:rows="10"
                v-bind:row-hover="true"
                v-if="data"
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
                    class="emailColumn"
                />
                <Column
                    field="role"
                    :sortable="true"
                    header="Role"
                    class="roleColumn"
                />
                <Column
                    field="created_at"
                    :sortable="true"
                    header="Created At"
                    class="createdAtColumn"
                />
                <Column
                    field="updated_at"
                    :sortable="true"
                    header="Updated At"
                    class="updatedAtColumn"
                />
                <Column class="actionColumn">
                    <template #body="row">
                        <div class="flex gap-1 justify-content-around">
                            <Button
                                class="desktopButton myButton"
                                icon="pi pi-eye"
                                @click="openModal('show', row.data)"
                            />
                            <Button
                                class="desktopButton myButton"
                                icon="pi pi-pencil"
                                @click="openModal('edit', row.data)"
                            />
                            <Button
                                class="desktopButton myButton"
                                icon="pi pi-trash"
                                @click="openModal('delete', row.data)"
                            />
                            <Button
                                class="mobileButton myButton"
                                icon="pi pi-bars"
                                @click="openMenu($event, row.data)"
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
        v-bind:user="selectedObject"
        v-bind:close="closeModal"
    />
    <CreateUser
        v-bind:visible="visibleCreate"
        v-bind:getData="getData"
        v-bind:options="roleOptions"
        v-bind:close="closeModal"
    />
    <EditUser
        v-bind:visible="visibleEdit"
        v-bind:user="selectedObject"
        v-bind:getData="getData"
        v-bind:options="roleOptions"
        v-bind:close="closeModal"
    />
    <Dialog v-bind:visible="visibleDelete" modal header="Confirm delete user">
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
                class="smallHeightButton"
            />
            <Button
                label="Confirm"
                @click="deleteUser(selectedObject)"
                class="smallHeightButton"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

import { UserInterface } from '../../../interfaces'

import CreateUser from './CreateUser.vue'
import ShowUser from './ShowUser.vue'
import EditUser from './EditUser.vue'

import { useApiErrors, useFlashToast, useModal } from '../../../utils'

const { apiErrors } = useApiErrors()
const { flashToast } = useFlashToast()
const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    setSelectedObject,
    openModal,
    closeModal,
} = useModal()

const props = defineProps<{
    data: UserInterface[]
    getData: () => void
    roleOptions: string[]
}>()

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
                    openModal('show', selectedObject.value)
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    openModal('edit', selectedObject.value)
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    openModal('delete', selectedObject.value)
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
        setSelectedObject(user)
    }
    menu.value.toggle(event)
}

function deleteUser(user: UserInterface): void {
    axios
        .delete(`/api/users/${user.id}`)
        .then(() => {
            closeModal('delete')
            props.getData()

            flashToast('Successfully deleted: ' + user.name, 'success')
        })
        .catch((error) => {
            closeModal('delete')
            apiErrors(error)
        })
}
</script>
