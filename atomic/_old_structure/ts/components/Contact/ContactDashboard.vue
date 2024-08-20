<template>
    <div class="panelContainer">
        <Card v-if="display.Contact" class="myCard chartCard annualChartCard">
            <template #content>
                <chart-organism
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :direction="'vertical'"
                    :contact-data="results"
                    :chart-class="'h-30rem'"
                />
                <progress-spinner-atom v-if="loading" />
            </template>
        </Card>
        <Card class="myCard contactDashboard">
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
                        class="text-sm smallHeightButton"
                        :rounded="true"
                        :style="contactStyle"
                        :class="{ loading: loading }"
                    />
                </div>
            </template>
            <template #content>
                <data-table-organism
                    v-if="results"
                    :data="results"
                    :open-dialog="openDialog"
                    :styles="contactStyle"
                    type="contact"
                    :loading="loading"
                />
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>
    </div>

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
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

import { contactApiMethods } from '@/utils'

import {
    handleStyles,
    useContactFields,
} from 'atomic/bosons/constants'
import { useDialog, useDisplayCharts } from 'atomic/bosons/utils'

const {
    visibleShow,
    visibleCreate,
    visibleEdit,
    visibleDelete,
    selectedObject,
    openDialog,
    closeDialog,
} = useDialog()

const { display } = useDisplayCharts()

const { createAndEditFields, showFields } = useContactFields()
const {
    loading,
    results,
    getAllContacts,
    storeContact,
    editContact,
    deleteContact,
} = contactApiMethods()
const { contactStyle } = handleStyles()

onMounted(() => {
    getAllContacts(500)
})

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
        getData: getAllContacts,
    },
    {
        entity: 'contact',
        action: 'create',
        visible: visibleCreate.value,
        title: 'Create new contact',
        confirmButtonLabel: 'Confirm',
        cancelButtonLabel: 'Cancel',
        confirm: storeContact,
        getData: getAllContacts,
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
        getData: getAllContacts,
        fields: createAndEditFields,
    },
])
</script>

<style scoped>
:deep(.p-progress-spinner-circle) {
    stroke: var(--contact-item-color);
    animation: p-progress-spinner-dash 1.2s ease-in-out infinite;
}
</style>
