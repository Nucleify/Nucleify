<template>
    <div class="card mt-2">
        <div class="card-body pt-4">
            <div class="flex justify-content-between mb-5">
                <h3>Manage Contacts</h3>

                <Button label="Create contact" @click="openModal('create')" />
            </div>

            <DataTable
                :value="results"
                v-if="results"
                paginator
                :rows="11"
                stripedRows
                :row-hover="true"
                @row-click="openModal('show', $event)"
                :size="'small'"
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
                <Button
                    label="Confirm"
                    @click="deleteContact(selectedContact)"
                />
            </div>
        </Dialog>
    </div>
    <ShowContact
        :visible="visibleShow"
        :contact="selectedContact"
        :close="closeModal"
    />
    <CreateContact
        :visible="visibleCreate"
        :options="options"
        :errors="errors"
        :flashValidationErrors="flashValidationErrors"
        :hideErrors="hideErrors"
        :close="closeModal"
    />
    <EditContact
        :visible="visibleEdit"
        :contact="selectedContact"
        :options="options"
        :errors="errors"
        :flashValidationErrors="flashValidationErrors"
        :hideErrors="hideErrors"
        :close="closeModal"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import axios from 'axios'

import CreateContact from './CreateContact.vue'
import ShowContact from './ShowContact.vue'
import EditContact from './EditContact.vue'

interface ContactData {
    first_name: string
    last_name: string
    email: string
    personal_phone: string
    work_phone: string
    address: string
    birthday: string
    contact_groups: string
    role: string
}

const props = defineProps<{
    errors: Ref<string[]>
    flashValidationErrors: (errors: Record<string, string[]>) => void
    hideErrors: () => void
}>()

const results = ref<any>(null)
const selectedContact = ref<ContactData | null>(null)
const options = ['user', 'admin']

const visibleShow = ref(false)
const visibleCreate = ref(false)
const visibleEdit = ref(false)
const visibleDelete = ref(false)

/**
 * Fetch contacts after component mounts
 */
onMounted(getContacts)

/**
 * Set selected contact function
 *
 * @param contactData
 */
function setSelectedContact(contactData: any): void {
    selectedContact.value = contactData
}

/**
 * Open modal function
 *
 * @param action
 * @param contactData
 */
function openModal(action: string, contactData?: any): void {
    setSelectedContact(contactData)

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
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}
async function deleteContact(contact: any) {
    await axios
        .delete(`/api/contacts/${contact.data.id}`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            visibleDelete.value = !visibleDelete.value
            getContacts()
        })
}
</script>
