<template>
    <div class="card mt-2">
        <div class="card-body pt-4">
            <div class="flex justify-content-between mb-5">
                <h3>Manage Contacts</h3>

                <CreateContact></CreateContact>
                <ShowContact
                    :visible="visible"
                    v-bind:toggle="toggleVisibilityShow"
                    v-bind:contact="selectedContact"
                >
                </ShowContact>
            </div>

            <DataTable
                :value="results"
                v-if="results"
                paginator
                :rows="11"
                stripedRows
                :row-hover="true"
                @row-click="toggleVisibilityShow"
                :size="'small'"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <Column
                    field="first_name"
                    :sortable="true"
                    header="First Name"
                ></Column>
                <Column
                    field="last_name"
                    :sortable="true"
                    header="Last Name"
                ></Column>
                <Column
                    field="email"
                    :sortable="true"
                    header="Email"
                    class="tabletColumn"
                ></Column>
                <Column
                    field="birthday"
                    :sortable="true"
                    header="Birthday"
                    class="desktopColumn"
                ></Column>
                <Column class="w-1rem">
                    <template #body="rowData">
                        <div class="flex gap-1 justify-content-around">
                            <Button
                                class="desktopButton contactButton"
                                @click="toggleVisibilityShow(rowData)"
                            >
                                <i class="pi pi-eye"></i>
                            </Button>
                            <Button class="desktopButton contactButton">
                                <i class="pi pi-pencil"></i>
                            </Button>
                            <Button
                                class="desktopButton contactButton"
                                @click="toggleVisibilityDelete(rowData)"
                            >
                                <i class="pi pi-trash"></i>
                            </Button>
                            <Button class="mobileButton contactButton">
                                <i class="pi pi-bars"></i>
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
            header="Confirm delete user"
        >
            <div class="flex justify-content-between">
                <Button
                    severity="secondary"
                    label="Cancel"
                    @click="visibleDelete = false"
                ></Button>
                <Button
                    label="Confirm"
                    @click="deleteContact(selectedContact)"
                ></Button>
            </div>
        </Dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'

import CreateContact from './CreateContact.vue'
import ShowContact from './ShowContact.vue'

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

export default defineComponent({
    setup() {
        const results = ref<any>(null)
        const visible = ref(false)
        const visibleDelete = ref(false)
        const selectedContact = ref<ContactData | null>(null)

        function toggleSelectContact(userData: any) {
            selectedContact.value = userData
        }
        function toggleVisibilityShow(contactData: any) {
            if (contactData) {
                toggleSelectContact(contactData)
            }
            visible.value = !visible.value
        }
        function toggleVisibilityDelete(contactData: any) {
            if (contactData) {
                toggleSelectContact(contactData)
            }
            visibleDelete.value = !visible.value
        }

        function getContacts() {
            axios
                .get('/api/contacts')
                .then((response) => {
                    results.value = response.data
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        function deleteContact(contact: any) {
            axios
                .delete(`/api/contacts/${contact.data.id}`)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    visibleDelete.value = false
                    getContacts()
                })
        }

        onMounted(getContacts)

        return {
            results,
            visible,
            visibleDelete,
            selectedContact,
            toggleVisibilityShow,
            toggleVisibilityDelete,
            deleteContact,
        }
    },
    components: {
        ShowContact,
        CreateContact,
    },
})
</script>
