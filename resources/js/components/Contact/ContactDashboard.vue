<template>
    <div class="card mt-2">
        <div class="card-body pt-4">
            <h3>Manage Contacts</h3>

            <DataTable
                :value="results"
                v-if="results"
                paginator
                :rows="11"
                resizableColumns
                columnResizeMode="fit"
                stripedRows
            >
                <Column field="id" sortable header="Id"></Column>
                <Column field="first_name" sortable header="First Name"></Column>
                <Column field="last_name" sortable header="Last Name"></Column>
                <Column field="email" sortable header="Email"></Column>
                <Column field="birthday" sortable header="Birthday"></Column>
            </DataTable>
            <div v-else>Loading data or no data available...</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted } from 'vue';

import axios from 'axios';

export default defineComponent({
    setup() {
        const results = ref(null);
        function getContacts() {
            axios
                .get('/api/contacts')
                .then((response) => {
                    results.value = response.data;
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        onMounted(getContacts);

        return {
            results,
        };
    },
});
</script>
