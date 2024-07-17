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
                <DataTable
                    :value="data"
                    :loading="loading"
                    :rows="10"
                    :row-hover="true"
                    :size="'small'"
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
                        field="full_name"
                        :sortable="true"
                        header="Full name"
                        class="fullNameColumn"
                    />
                    <Column
                        field="email"
                        :sortable="true"
                        header="Email"
                        class="emailColumn tabletColumn"
                    />
                    <Column
                        field="birthday"
                        :sortable="true"
                        header="Birthday"
                        class="birthdayColumn desktopColumn"
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
                                    :style="contactStyle"
                                />
                                <button-atom
                                    class="mobileButton dataTableButton"
                                    icon="pi pi-bars"
                                    @click="openMenu(menu, $event, row.data)"
                                    :rounded="true"
                                    :style="contactStyle"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>

        <Menu ref="menu" :model="dropdownItems" :popup="true" />
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
import { ref, computed } from 'vue'

import { handleDropdownItems } from '@/constants'
import { contactApiMethods, useMenuAndModal } from '@/utils'

import {
    handleActions,
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
const menu = ref()
const actions = handleActions(openDialog)
const { dropdownItems } = handleDropdownItems(selectedObject, openDialog)
const { openMenu } = useMenuAndModal()

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
