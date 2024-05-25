<template>
    <section id="contacts">
        <Card class="myCard lg:ml-2 lg:mr-5">
            <template #title>
                <div class="flex justify-content-between">
                    <h3>Manage Contacts</h3>

                    <Button
                        label="New Contact"
                        @click="openModal('create')"
                        class="text-sm smallHeightButton"
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
                            <div class="flex gap-1 justify-content-around">
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-eye"
                                    @click="openModal('show', row.data)"
                                    :style="contactStyle"
                                />
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-pencil"
                                    @click="openModal('edit', row.data)"
                                    :style="contactStyle"
                                />
                                <Button
                                    class="desktopButton myButton"
                                    icon="pi pi-trash"
                                    @click="openModal('delete', row.data)"
                                    :style="contactStyle"
                                />
                                <Button
                                    class="mobileButton myButton"
                                    icon="pi pi-bars"
                                    @click="openMenu(menu, $event, row.data)"
                                    :style="contactStyle"
                                />
                                <Menu
                                    ref="menu"
                                    :model="dropdownItems"
                                    :popup="true"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <div v-else>Loading data or no data available...</div>
            </template>
        </Card>
    </section>
    <ShowContact
        :visible="visibleShow"
        :contact="selectedObject"
        :close="closeModal"
    />
    <CreateContact
        :getData="getData"
        :visible="visibleCreate"
        :options="roleOptions"
        :close="closeModal"
        :style="contactStyle"
    />
    <EditContact
        :contact="selectedObject"
        :getData="getData"
        :visible="visibleEdit"
        :options="roleOptions"
        :close="closeModal"
        :style="contactStyle"
    />
    <Dialog :visible="visibleDelete" modal header="Confirm delete contact">
        <div class="flex justify-content-between">
            <Button
                severity="secondary"
                label="Cancel"
                @click="closeModal('delete')"
                class="smallHeightButton"
            />
            <Button
                label="Confirm"
                @click="deleteContact(selectedObject.id, getData, closeModal)"
                class="smallHeightButton"
                :style="contactStyle"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CreateContact from './CreateContact.vue'
import ShowContact from './ShowContact.vue'
import EditContact from './EditContact.vue'

import { ContactInterface } from '@/types'
import { handleDropdownItems, handleStyles, roleOptions } from '@/constants'
import { contactApiMethods, useMenuAndModal } from '@/utils'

defineProps<{
    data: ContactInterface[] | undefined
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

const { deleteContact } = contactApiMethods()

const { contactStyle } = handleStyles()

const { dropdownItems } = handleDropdownItems(selectedObject, openModal)
</script>
