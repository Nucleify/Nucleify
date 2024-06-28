<template>
    <section id="users">
        <Card class="myCard">
            <template #title>
                <div class="myCardHeaderContainer">
                    <h3>Manage Users</h3>

                    <button-atom
                        label="New User"
                        @click="openModal('create')"
                        class="text-sm smallHeightButton primaryButton"
                        :rounded="true"
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
                    <template #loading><progress-spinner-atom /></template>
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
                                <button-atom
                                    class="desktopButton dataTableButton"
                                    icon="pi pi-eye"
                                    @click="openModal('show', row.data)"
                                    :rounded="true"
                                    :style="userStyle"
                                />
                                <button-atom
                                    class="desktopButton dataTableButton"
                                    icon="pi pi-pencil"
                                    @click="openModal('edit', row.data)"
                                    :rounded="true"
                                    :style="userStyle"
                                />
                                <button-atom
                                    class="desktopButton dataTableButton"
                                    icon="pi pi-trash"
                                    @click="openModal('delete', row.data)"
                                    :rounded="true"
                                    :style="userStyle"
                                />
                                <button-atom
                                    class="mobileButton dataTableButton"
                                    icon="pi pi-bars"
                                    @click="openMenu(menu, $event, row.data)"
                                    :rounded="true"
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
            <button-atom
                label="Cancel"
                severity="secondary"
                @click="closeModal('delete')"
                :rounded="true"
            />
            <button-atom
                label="Confirm"
                @click="deleteUser(selectedObject!.id!, getData, closeModal)"
                :rounded="true"
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
import { handleDropdownItems, roleOptions } from '@/constants'
import { useMenuAndModal, userApiMethods } from '@/utils'

import { handleStyles } from 'atomic/bosons/constants'

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
