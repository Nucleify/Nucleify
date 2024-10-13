<template>
    <DataTable
        v-if="props.value && !props.loading"
        :value="props.value"
        :data-key="props.dataKey"
        :rows="props.rows"
        :first="props.first"
        :total-records="props.totalRecords"
        :paginator="props.paginator || true"
        :paginator-position="props.paginatorPosition"
        :always-show-paginator="props.alwaysShowPaginator"
        :paginator-template="props.paginatorTemplate"
        :page-link-size="props.pageLinkSize"
        :rows-per-page-options="props.rowsPerPageOptions"
        :current-page-report-template="props.currentPageReportTemplate"
        :lazy="props.lazy"
        :loading="props.loading"
        :sort-field="props.sortField"
        :sort-order="props.sortOrder"
        :null-sort-order="props.nullSortOrder"
        :default-sort-order="props.defaultSortOrder"
        :multi-sort-meta="props.multiSortMeta"
        :sort-mode="props.sortMode"
        :removable-sort="props.removableSort"
        :filters="props.filters"
        :filter-display="props.filterDisplay"
        :filter-locale="props.filterLocale"
        :selection-mode="props.selectionMode"
        :compare-selection-by="props.compareSelectionBy"
        :meta-key-selection="props.metaKeySelection"
        :context-menu="props.contextMenu"
        :context-menu-selection="props.contextMenuSelection"
        :select-all="props.selectAll"
        :row-hover="props.rowHover || true"
        :csv-separator="props.csvSeparator"
        :export-filename="props.exportFilename"
        :export-function="props.exportFunction"
        :resizable-columns="props.resizableColumns"
        :column-resize-mode="props.columnResizeMode"
        :reorderable-columns="props.reorderableColumns"
        :expanded-rows="props.expandedRows"
        :row-group-mode="props.rowGroupMode"
        :group-rows-by="props.groupRowsBy"
        :expandable-row-groups="props.expandableRowGroups"
        :expanded-row-groups="props.expandedRowGroups"
        :state-storage="props.stateStorage"
        :state-key="props.stateKey"
        :edit-mode="props.editMode"
        :editing-rows="props.editingRows"
        :row-class="props.rowClass"
        :row-style="props.rowStyle"
        :scrollable="props.scrollable"
        :scroll-height="props.scrollHeight"
        :virtual-scroller-options="props.virtualScrollerOptions"
        :frozen-value="props.frozenValue"
        :breakpoint="props.breakpoint"
        :show-gridlines="props.showGridlines"
        :striped-rows="props.stripedRows || true"
        :highlight-on-select="props.highlightOnSelect"
        :size="props.size || 'small'"
        :table-style="props.tableStyle"
        :table-class="props.tableClass"
        :table-props="props.tableProps"
        :filter-input-props="props.filterInputProps"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :unstyled="props.unstyled"
        @row-click="openDialog('show', $event.data)"
        :v-type="props.type"
    >
        <Column
            v-for="col in specificColumns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            :class="col.class"
            :sortable="col.sortable"
        />

        <Column class="action-column">
            <template #body="row">
                <div class="action-column-content">
                    <ad-button
                        v-if="props.type === 'activity'"
                        :type="props.type"
                        class="data-table-button"
                        icon="pi pi-trash"
                        @click="openDialog('delete', row.data)"
                        rounded
                        text
                        :loading="props.loading"
                    />
                    <template v-else>
                        <ad-button
                            v-for="action in actions"
                            :type="props.type"
                            :key="action.icon"
                            class="desktop-button data-table-button"
                            :icon="action.icon"
                            @click="action.click(row.data)"
                            rounded
                            text
                            :loading="props.loading"
                        />
                        <ad-button
                            :type="props.type"
                            class="mobile-button data-table-button"
                            icon="pi pi-bars"
                            @click="openMenu(menu, $event, row.data)"
                            rounded
                            text
                            :loading="props.loading"
                        />
                        <Menu ref="menu" :model="dropdownItems" :popup="true" />
                    </template>
                </div>
            </template>
        </Column>
    </DataTable>
    <ad-data-table-skeleton
        :rows="skeleton"
        :loading="props.loading"
        :specific-columns="specificColumns"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { columns, actions as actionsList } from 'atomic/bosons/constants'
import { DataTableInterface } from 'atomic/bosons/types'
import { useDropdown, useMenu } from 'atomic/bosons/utils'

const props = defineProps<DataTableInterface>()
const menu = ref()
const actions = actionsList(props.openDialog)

const { openMenu, selectedObject } = useMenu()
const { dropdownItems } = useDropdown(selectedObject, props.openDialog)

const specificColumns = columns[props.type]
const skeleton = ref(new Array(props.rows))
</script>
