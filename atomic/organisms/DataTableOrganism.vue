<template>
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
        <template v-if="type === 'activity'">
            <Column
                field="id"
                :sortable="true"
                header="ID"
                class="idActivityColumn"
            />
            <Column
                field="description"
                :sortable="true"
                header="Description"
                class="descriptionColumn"
            />
            <Column
                field="created_at"
                :sortable="true"
                header="Created At"
                class="createdAtActivityColumn"
            />
        </template>
        <template v-if="type === 'article'">
            <Column field="id" :sortable="true" header="ID" class="idColumn" />
            <Column
                field="title"
                :sortable="true"
                header="Title"
                class="titleColumn"
            />
            <Column
                field="category"
                :sortable="true"
                header="Category"
                class="categoryColumn desktopColumn"
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
        </template>
        <template v-if="type === 'contact'">
            <Column field="id" :sortable="true" header="ID" class="idColumn" />
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
        </template>
        <template v-if="type === 'user'">
            <Column field="id" :sortable="true" header="ID" class="idColumn" />
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
        </template>
        <Column class="actionColumn">
            <template #body="row">
                <div class="actionColumnContent">
                    <button-atom
                        v-if="type === 'activity'"
                        class="dataTableButton"
                        icon="pi pi-trash"
                        @click="openDialog('delete', row.data)"
                        :rounded="true"
                        :style="styles"
                    />
                    <template v-else>
                        <button-atom
                            v-for="action in actions"
                            :key="action.icon"
                            class="desktopButton dataTableButton"
                            :icon="action.icon"
                            @click="action.click(row.data)"
                            :rounded="true"
                            :style="styles"
                        />
                        <button-atom
                            class="mobileButton dataTableButton"
                            icon="pi pi-bars"
                            @click="openMenu(menu, $event, row.data)"
                            :rounded="true"
                            :style="styles"
                        />
                        <Menu ref="menu" :model="dropdownItems" :popup="true" />
                    </template>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { handleActions } from 'atomic/bosons/constants'
import { DataTableInterface } from 'atomic/bosons/types'

import { handleDropdownItems } from '@/constants'
import { useMenuAndModal } from '@/utils'

const props = defineProps<DataTableInterface>()

const menu = ref()
const actions = handleActions(props.openDialog)

const { openMenu, selectedObject } = useMenuAndModal()
const { dropdownItems } = handleDropdownItems(selectedObject, props.openDialog)
</script>
