<template>
    <section id="users">
        <Card class="myCard">
            <template #title>
                <div class="myCardHeaderContainer">
                    <heading-atom :tag="3" text="Manage Users" class="-mb-2" />

                    <button-atom
                        label="New User"
                        @click="openDialog('create')"
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
                    @row-click="openDialog('show', $event.data)"
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
                                    v-for="action in actions"
                                    :key="action.icon"
                                    class="desktopButton dataTableButton"
                                    :icon="action.icon"
                                    @click="action.click(row.data)"
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
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>

        <Menu ref="menu" :model="dropdownItems" :popup="true" class="w-10rem" />
        <dialog-organism
            v-for="dialog in dialogs"
            :key="dialog.action"
            :entity="dialog.entity"
            :action="dialog.action"
            :visible="dialog.visible"
            :selected-object="selectedObject"
            :title="dialog.title"
            :fields="dialog.fields"
            :confirm-button-label="dialog.confirmButtonLabel"
            :cancel-button-label="dialog.cancelButtonLabel"
            :confirm="dialog.confirm"
            :get-data="dialog.getData"
            :close="closeDialog"
            :style="userStyle"
        />
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { handleDropdownItems } from '@/constants'
import { useMenuAndModal, userApiMethods } from '@/utils'

import {
    handleActions,
    handleStyles,
    useUserFields,
} from 'atomic/bosons/constants'
import { DashboardInterface } from 'atomic/bosons/types'
import { useDialog } from 'atomic/bosons/utils'

const props = defineProps<DashboardInterface>()

const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    openDialog,
    closeDialog,
} = useDialog()
const menu = ref()
const actions = handleActions(openDialog)
const { dropdownItems } = handleDropdownItems(selectedObject, openDialog)
const { openMenu } = useMenuAndModal()

const { createFields, editFields, showFields } = useUserFields()
const { deleteUser, storeUser, editUser } = userApiMethods()
const { userStyle } = handleStyles()

const dialogs = computed(() => [
    {
        entity: 'user',
        action: 'show',
        visible: visibleShow.value,
        data: selectedObject.value,
        cancelButtonLabel: 'Close',
        fields: showFields,
    },
    {
        entity: 'user',
        action: 'delete',
        visible: visibleDelete.value,
        selectedObject: selectedObject.value,
        title: 'Delete user?',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: deleteUser,
        getData: props.getData,
    },
    {
        entity: 'user',
        action: 'create',
        visible: visibleCreate.value,
        title: 'Create new user',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: storeUser,
        getData: props.getData,
        fields: createFields,
    },
    {
        entity: 'user',
        action: 'edit',
        visible: visibleEdit.value,
        data: selectedObject.value,
        title: 'Edit user',
        confirmButtonLabel: 'Update',
        cancelButtonLabel: 'Cancel',
        confirm: editUser,
        getData: props.getData,
        fields: editFields,
    },
])
</script>
