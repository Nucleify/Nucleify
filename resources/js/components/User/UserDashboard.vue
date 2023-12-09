<template>
    <div class="card mt-1">
        <div class="card-body pt-4">
            <h3>Manage Users</h3>

            <table class="table table-hover" v-if="results">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody v-if="true">
                <tr v-for="user in results" :key="user.id">
                    <td> {{ user.id }} </td>
                    <td> {{ user.name }} </td>
                    <td> {{ user.email }} </td>
                    <td> {{ user.role }} </td>
                </tr>
                </tbody>
            </table>
            <div v-else>
                Loading data or no data available...
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue';

import axios from 'axios';

export default defineComponent({
    setup() {
        const results = ref(null);

        function getUsers() {
            axios.get('/api/users')
                .then(response => {
                    results.value = response.data;
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        onMounted(getUsers);

        return {
            results
        };
    }
})
</script>
