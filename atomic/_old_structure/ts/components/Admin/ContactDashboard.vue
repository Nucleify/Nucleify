<template>
    <section id="contacts">
        <Card class="myCard">
            <template #title>
                <div class="myCardHeaderContainer">
                    <heading-atom
                        :tag="3"
                        text="Manage Contacts"
                        class="-mb-2"
                    />

                    <button-atom
                        label="New Contact"
                        @click="openDialog('create')"
                        class="text-sm smallHeightButton primaryButton"
                        :rounded="true"
                        :style="contactStyle"
                        :class="{ loading: loading }"
                    />
                </div>
            </template>
            <template #content>
                <data-table-organism
                    v-if="data"
                    :data="data"
                    :open-dialog="openDialog"
                    :styles="contactStyle"
                    type="contact"
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
            :style="contactStyle"
        />
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { contactApiMethods } from '@/utils'

import {
    handleStyles,
    useContactFields,
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

const { createAndEditFields, showFields } = useContactFields()
const { deleteContact, storeContact, editContact } = contactApiMethods()
const { contactStyle } = handleStyles()

const dialogs = computed(() => [
    {
        entity: 'contact',
        action: 'show',
        visible: visibleShow.value,
        data: selectedObject.value,
        cancelButtonLabel: 'Close',
        fields: showFields,
    },
    {
        entity: 'contact',
        action: 'delete',
        visible: visibleDelete.value,
        selectedObject: selectedObject.value,
        title: 'Delete contact?',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: deleteContact,
        getData: props.getData,
    },
    {
        entity: 'contact',
        action: 'create',
        visible: visibleCreate.value,
        title: 'Create new contact',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: storeContact,
        getData: props.getData,
        fields: createAndEditFields,
    },
    {
        entity: 'contact',
        action: 'edit',
        visible: visibleEdit.value,
        data: selectedObject.value,
        title: 'Edit contact',
        confirmButtonLabel: 'Update',
        cancelButtonLabel: 'Cancel',
        confirm: editContact,
        getData: props.getData,
        fields: createAndEditFields,
    },
])
</script>
