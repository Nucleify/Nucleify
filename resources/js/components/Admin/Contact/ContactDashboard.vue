<template>
    <Card class="myCard lg:ml-2 lg:mr-5">
        <template #title>
            <div class="flex justify-content-between">
                <h3>Manage Contacts</h3>

                <Button
                    label="New Contact"
                    @click="openModal('create')"
                    class="text-sm smallHeightButton"
                />
            </div>
        </template>
        <template #content="row">
            <DataTable
                v-bind:value="data"
                v-bind:rows="10"
                v-bind:row-hover="true"
                v-bind:size="'small'"
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
                    field="full_name"
                    :sortable="true"
                    header="Full name"
                    class="fullNameColumn"
                />
                <Column
                    field="email"
                    :sortable="true"
                    header="Email"
                    class="emailColumn tabletColumn"
                />
                <Column
                    field="birthday"
                    :sortable="true"
                    header="Birthday"
                    class="birthdayColumn desktopColumn"
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
                            <Menu ref="menu" :model="items" :popup="true" />
                        </div>
                    </template>
                </Column>
            </DataTable>
            <div v-else>Loading data or no data available...</div>
        </template>
    </Card>

    <ShowContact
        v-bind:visible="visibleShow"
        v-bind:contact="selectedObject"
        v-bind:close="closeModal"
    />
    <CreateContact
        v-bind:getData="getData"
        v-bind:visible="visibleCreate"
        v-bind:options="roleOptions"
        v-bind:close="closeModal"
    />
    <EditContact
        v-bind:contact="selectedObject"
        v-bind:getData="getData"
        v-bind:visible="visibleEdit"
        v-bind:options="roleOptions"
        v-bind:close="closeModal"
    />
    <Dialog
        v-model:visible="visibleDelete"
        modal
        header="Confirm delete contact"
    >
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
                class="smallHeightButton"
            />
            <Button
                label="Confirm"
                @click="deleteContact(selectedObject)"
                class="smallHeightButton"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

import CreateContact from './CreateContact.vue'
import ShowContact from './ShowContact.vue'
import EditContact from './EditContact.vue'

import { useApiErrors, useFlashToast, useModal } from '../../../utils'
import { ContactInterface } from '../../../interfaces'

const { flashToast } = useFlashToast()
const { apiErrors } = useApiErrors()
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
    data: ContactInterface[]
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

function openMenu(event: MouseEvent, contact: ContactInterface): void {
    if (contact) {
        setSelectedObject(contact)
    }
    menu.value.toggle(event)
}

/**
 * HTTP requests functions
 */
function deleteContact(contact: ContactInterface): void {
    axios
        .delete(`/api/contacts/${contact.id}`)
        .then(() => {
            closeModal('delete')
            props.getData()

            flashToast('Successfully deleted: ' + contact.full_name, 'success')
        })
        .catch((error) => {
            closeModal('delete')
            apiErrors(error)
        })
}
</script>
