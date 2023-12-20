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
                <Column field="id" :sortable="true" header="Id"></Column>
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
                <Column field="email" :sortable="true" header="Email"></Column>
                <Column
                    field="birthday"
                    :sortable="true"
                    header="Birthday"
                ></Column>
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
