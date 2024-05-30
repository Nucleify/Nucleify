<template>
    <section id="users">
        <Card class="myCard">
            <template #title>
                <div class="myCardHeaderContainer">
                    <h3>Manage Users</h3>

                    <Button
                        label="New User"
                        @click="openModal('create')"
                        class="text-sm smallHeightButton"
                        :style="userStyle"
                        :class="{ loading: loading }"
                    />
                </div>
            </template>
            <template #content>
                <DataTable
                    :value="data"
                    :loading="loading"
                    :size="'small'"
                    :rows="10"
                    :row-hover="true"
                    v-if="data"
                    paginator
                    stripedRows
                    @row-click="openModal('show', $event.data)"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                >
                    <template #loading><ProgressSpinner /></template>
                    <Column
                        field="id"
                        :sortable="true"
                        header="ID"
                        class="idColumn"
                    />
                    <Column
                        field="name"
                        :sortable="true"
                        header="Name"
                        class="nameColumn"
                    />
                    <Column
                        field="email"
                        :sortable="true"
                        header="Email"
                        class="emailColumn"
                    />
                    <Column
                        field="role"
                        :sortable="true"
                        header="Role"
                        class="roleColumn"
                    />
                    <Column
                        field="created_at"
                        :sortable="true"
                        header="Created At"
                        class="createdAtColumn"
                    />
                    <Column
                        field="updated_at"
                        :sortable="true"
                        header="Updated At"
                        class="updatedAtColumn"
                    />
                    <Column class="actionColumn">
                        <template #body="row">
                            <div class="actionColumnContent">
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-eye"
                                    @click="openModal('show', row.data)"
                                    :style="userStyle"
                                />
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-pencil"
                                    @click="openModal('edit', row.data)"
                                    :style="userStyle"
                                />
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-trash"
                                    @click="openModal('delete', row.data)"
                                    :style="userStyle"
                                />
                                <Button
                                    class="mobileButton myButton"
                                    icon="pi pi-bars"
                                    @click="openMenu(menu, $event, row.data)"
                                    :style="userStyle"
                                />
                                <Menu
                                    ref="menu"
                                    :model="dropdownItems"
                                    :popup="true"
                                    class="w-10rem"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>
    </section>
    <ShowUser
        :visible="visibleShow"
        :user="selectedObject"
        :close="closeModal"
    />
    <CreateUser
        :visible="visibleCreate"
        :getData="getData"
        :options="roleOptions"
        :close="closeModal"
        :style="userStyle"
    />
    <EditUser
        :visible="visibleEdit"
        :user="selectedObject"
        :getData="getData"
        :options="roleOptions"
        :close="closeModal"
        :style="userStyle"
    />
    <Dialog :visible="visibleDelete" modal header="Confirm delete user">
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
                class="smallHeightButton"
            />
            <Button
                label="Confirm"
                @click="deleteUser(selectedObject.id, getData, closeModal)"
                class="smallHeightButton"
                :style="userStyle"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CreateUser from './CreateUser.vue'
import ShowUser from './ShowUser.vue'
import EditUser from './EditUser.vue'

import { UserInterface } from '@/types'
import { handleDropdownItems, handleStyles, roleOptions } from '@/constants'
import { useMenuAndModal, userApiMethods } from '@/utils'

defineProps<{
    data: UserInterface[] | undefined
    getData: () => void
    loading: boolean
}>()

const menu = ref()

const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    openMenu,
    openModal,
    closeModal,
} = useMenuAndModal()

const { deleteUser } = userApiMethods()

const { userStyle } = handleStyles()

const { dropdownItems } = handleDropdownItems(selectedObject, openModal)
</script>
