<template>
    <section id="users">
        <card-data-table
            :data="data"
            :loading="loading"
            :open-dialog="openDialog"
            :styles="userStyle"
            :tag="3"
            type="user"
            headerText="Manage Users"
            buttonText="New User"
        />

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
import { computed } from 'vue'

import { userApiMethods } from '@/utils'

import {
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
