<template>
    <div class="card mt-1">
        <div class="card-body pt-4">
            <div class="flex justify-content-between mb-5">
                <h3>Manage Users</h3>

                <CreateUser></CreateUser>
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
                <Column field="name" :sortable="true" header="Name"></Column>
                <Column field="email" :sortable="true" header="Email"></Column>
                <Column field="role" :sortable="true" header="Role"></Column>
            </DataTable>
            <div v-else>Loading data or no data available...</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CreateUser from './CreateUser.vue'

export default defineComponent({
    setup() {
        const results = ref(null)

        function getUsers() {
            axios
                .get('/api/users')
                .then((response) => {
                    results.value = response.data
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        onMounted(getUsers)

        return {
            results,
        }
    },
    components: {
        CreateUser,
    },
})
</script>
