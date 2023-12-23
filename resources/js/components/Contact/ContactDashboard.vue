<template>
    <div class="card mt-2">
        <div class="card-body pt-4">
            <div class="flex justify-content-between mb-5">
                <h3>Manage Contacts</h3>

                <CreateContact></CreateContact>
            </div>

            <DataTable
                :value="results"
                v-if="results"
                paginator
                :rows="11"
                stripedRows
                :row-hover="true"
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
                    <template #body>
                        <div class="flex gap-1 justify-content-around">
                            <Button class="desktopButton contactButton">
                                <i class="pi pi-eye"></i>
                            </Button>
                            <Button class="desktopButton contactButton">
                                <i class="pi pi-pencil"></i>
                            </Button>
                            <Button class="desktopButton contactButton">
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CreateContact from './CreateContact.vue'

export default defineComponent({
    setup() {
        const results = ref(null)
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

        onMounted(getContacts)

        return {
            results,
        }
    },
    components: {
        CreateContact,
    },
})
</script>
