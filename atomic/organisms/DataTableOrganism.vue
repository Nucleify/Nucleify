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

        <Column
            v-for="col in specificColumns"
            :key="col.field"
            :type="type"
            :field="col.field"
            :header="col.header"
            :class="col.class"
        />

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
</script>
