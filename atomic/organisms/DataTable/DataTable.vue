<template>
    <DataTable
        v-if="value && !loading"
        :value="value"
        :loading="loading"
        :rows="rows"
        :size="'small'"
        :row-hover="true"
        paginator
        stripedRows
        @row-click="openDialog('show', $event.data)"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        :v-type="type"
    >
        <Column
            v-for="col in specificColumns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            :class="col.class"
            :sortable="col.sortable"
        />

        <Column class="actionColumn">
            <template #body="row">
                <div class="actionColumnContent">
                    <button-atom
                        v-if="type === 'activity'"
                        :type="type"
                        class="dataTableButton"
                        icon="pi pi-trash"
                        @click="openDialog('delete', row.data)"
                        rounded
                        text
                        :loading="loading"
                    />
                    <template v-else>
                        <button-atom
                            v-for="action in actions"
                            :type="type"
                            :key="action.icon"
                            class="desktopButton dataTableButton"
                            :icon="action.icon"
                            @click="action.click(row.data)"
                            rounded
                            text
                            :loading="loading"
                        />
                        <button-atom
                            :type="type"
                            class="mobileButton dataTableButton"
                            icon="pi pi-bars"
                            @click="openMenu(menu, $event, row.data)"
                            rounded
                            text
                            :loading="loading"
                        />
                        <Menu ref="menu" :model="dropdownItems" :popup="true" />
                    </template>
                </div>
            </template>
        </Column>
    </DataTable>
    <data-table-skeleton
        :rows="skeleton"
        :loading="loading"
        :specific-columns="specificColumns"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { columns, handleActions } from 'atomic/bosons/constants'
import { DataTableInterface } from 'atomic/bosons/types'

import { handleDropdownItems } from '@/constants'
import { useMenuAndModal } from '@/utils'

const props = defineProps<DataTableInterface>()
const menu = ref()
const actions = handleActions(props.openDialog)

const { openMenu, selectedObject } = useMenuAndModal()
const { dropdownItems } = handleDropdownItems(selectedObject, props.openDialog)

const specificColumns = columns[props.type]
const skeleton = ref(new Array(props.rows))
</script>
