<template>
    <div class="card mt-1">
        <div class="card-body pt-4">
            <div class="flex justify-content-between mb-5">
                <h3>Manage Users</h3>

                <CreateUser></CreateUser>
                <ShowUser
                    :visible="visible"
                    v-bind:toggle="toggleVisibility"
                    v-bind:user="selectedUser"
                >
                </ShowUser>
            </div>

            <DataTable
                :value="results"
                v-if="results"
                paginator
                :rows="11"
                stripedRows
                :row-hover="true"
                :size="'small'"
                @row-click="toggleVisibility"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <Column field="id" :sortable="true" header="Id"></Column>
                <Column field="name" :sortable="true" header="Name"></Column>
                <Column
                    field="email"
                    :sortable="true"
                    header="Email"
                    class="tabletColumn"
                ></Column>
                <Column
                    field="role"
                    :sortable="true"
                    header="Role"
                    class="desktopColumn"
                ></Column>
                <Column class="w-1rem">
                    <template #body="rowData">
                        <div class="flex gap-1 justify-content-around">
                            <Button
                                class="desktopButton contactButton"
                                @click="toggleVisibility(rowData)"
                            >
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
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'

import CreateUser from './CreateUser.vue'
import ShowUser from './ShowUser.vue'
import ShowContact from '../Contact/ShowContact.vue'

interface UserData {
    id: number
    name: string
    email: string
    role: string
}

export default defineComponent({
    setup() {
        const results = ref<any>(null)
        const visible = ref(false)
        const selectedUser = ref<UserData | null>(null)

        function toggleVisibility(userData: any) {
            if (userData) {
                selectedUser.value = userData
                visible.value = !visible.value
            }
        }

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
            visible,
            selectedUser,
            toggleVisibility,
        }
    },
    components: {
        ShowContact,
        ShowUser,
        CreateUser,
    },
})
</script>
