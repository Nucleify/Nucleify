<template>
    <div class="card mt-2">
        <div class="card-body pt-4">
            <h3>Manage Contacts</h3>

            <table class="table table-hover" v-if="results">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody v-if="true">
                <tr v-for="contact in results" :key="contact.id">
                    <td> {{ contact.id }} </td>
                    <td> {{ contact.first_name }} {{ contact.last_name }} </td>
                    <td> {{ contact.email }} </td>
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

        function getContacts() {
            axios.get('/api/contacts')
                .then(response => {
                    results.value = response.data;
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        onMounted(getContacts);

        return {
            results
        };
    }
})
</script>
