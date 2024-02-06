<template>
    <div class="card mt-1">
        <div class="card-body pt-4">
            <div class="flex justify-content-between mb-5">
                <h3>Manage Users</h3>

                <CreateUser
                    :options="options"
                >
                </CreateUser>
                <ShowUser
                    :visible="visible"
                    v-bind:toggle="toggleVisibilityShow"
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
                @row-click="toggleVisibilityShow"
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
                    @click="deleteUser(selectedUser)"
                ></Button>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CreateUser from './CreateUser.vue'
import ShowUser from './ShowUser.vue'

interface UserData {
    id: number
    name: string
    email: string
    role: string
}

const results = ref<any>(null)
const visible = ref(false)
const visibleDelete = ref(false)
const selectedUser = ref<UserData | null>(null)
const options = ['user', 'admin']

function toggleSelectUser(userData: any): void {
    selectedUser.value = userData
}
function toggleVisibilityShow(userData: any): void {
    toggleSelectUser(userData)
    visible.value = !visible.value
}

function toggleVisibilityDelete(userData: any): void {
    toggleSelectUser(userData)
    visibleDelete.value = !visibleDelete.value
}

function getUsers(): void {
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
function deleteUser(user: any): void {
    axios
        .delete(`/api/users/${user.data.id}`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            visibleDelete.value = false
            getUsers()
        })
}

onMounted(getUsers)
</script>
