<template>
    <Card class="myCard contactDashboard mt-3">
        <template #title>
            <div class="flex justify-content-between">
                <h3>Manage Contacts</h3>

                <Button
                    label="New Contact"
                    @click="openModal('create')"
                    class="text-sm newButton"
                />
            </div>
        </template>
        <template #content="rowData">
            <DataTable
                v-bind:value="results"
                v-bind:rows="11"
                v-bind:row-hover="true"
                v-bind:size="'small'"
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
        v-bind:contact="selectedContact"
        v-bind:close="closeModal"
    />
    <CreateContact
        v-bind:visible="visibleCreate"
        v-bind:options="roleOptions"
        v-bind:flashSuccessMessage="flashSuccessMessage"
        v-bind:flashDangerMessage="flashDangerMessage"
        v-bind:flashValidationErrors="flashValidationErrors"
        v-bind:close="closeModal"
    />
    <EditContact
        v-bind:visible="visibleEdit"
        v-bind:contact="selectedContact"
        v-bind:options="roleOptions"
        v-bind:flashSuccessMessage="flashSuccessMessage"
        v-bind:flashDangerMessage="flashDangerMessage"
        v-bind:flashValidationErrors="flashValidationErrors"
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
            />
            <Button label="Confirm" @click="deleteContact(selectedContact)" />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { ContactData } from '../../../utils/handleInterfaces'

import CreateContact from './CreateContact.vue'
import ShowContact from './ShowContact.vue'
import EditContact from './EditContact.vue'

const props = defineProps<{
    roleOptions: string[]
    flashSuccessMessage: (message: string) => void
    flashDangerMessage: (message: string) => void
    flashValidationErrors: (errors: Record<string, string[]>) => void
}>()

const results = ref<ContactData[]>([])
const selectedContact = ref<ContactData | undefined>(undefined)
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
                    openModal('show', selectedContact.value)
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    openModal('edit', selectedContact.value)
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    openModal('delete', selectedContact.value)
                },
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
            },
        ],
    },
])

function openMenu(event: MouseEvent, contact: ContactData): void {
    if (contact) {
        setSelectedContact(contact)
    }
    menu.value.toggle(event)
}

/**
 * Fetch contacts after component mounts
 */
onMounted(getContacts)

/**
 * Set selected contact function
 *
 * @param contactData
 */
function setSelectedContact(contactData: ContactData): void {
    selectedContact.value = contactData
}

/**
 * Open modal function
 *
 * @param action
 * @param contact
 */
function openModal(action: string, contact?: ContactData | undefined): void {
    if (contact) {
        setSelectedContact(contact)
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
async function getContacts() {
    await axios
        .get('/api/contacts')
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
function deleteContact(contact: any): void {
    axios
        .delete(`/api/contacts/${contact.data.id}`)
        .then(() => {
            closeModal('delete')
            getContacts()
            success_message.value =
                'Successfully deleted: ' + contact.data.full_name

            props.flashSuccessMessage(success_message.value)
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
</script>
