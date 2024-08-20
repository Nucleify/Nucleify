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
                <data-table-organism
                    v-if="data"
                    :data="data"
                    :open-dialog="openDialog"
                    :styles="userStyle"
                    type="user"
                    :loading="loading"
                />
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>

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
