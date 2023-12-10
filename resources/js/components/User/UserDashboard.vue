<template>
    <div class="card mt-1">
        <div class="card-body pt-4">
            <h3>Manage Users</h3>

            <DataTable
                :value="results"
                v-if="results"
                paginator
                :rows="11"
                resizableColumns
                columnResizeMode="fit"
                stripedRows
            >
                <Column field="id" sortable header="Id" ></Column>
                <Column field="name" sortable header="Name"></Column>
                <Column field="email" sortable header="Email"></Column>
                <Column field="role" sortable header="Role"></Column>
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

        function getUsers() {
            axios
                .get('/api/users')
                .then((response) => {
                    results.value = response.data;
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        onMounted(getUsers);

        return {
            results,
        };
    },
});
</script>
