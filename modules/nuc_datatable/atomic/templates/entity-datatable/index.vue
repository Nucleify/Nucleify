<template>
  <ad-data-table
    :ad-type="props.adType"
    :value="props.value"
    :data-key="props.dataKey"
    :rows="props.rows"
    :first="props.first"
    :total-records="props.totalRecords"
    :paginator="props.paginator"
    :paginator-position="props.paginatorPosition"
    :always-show-paginator="props.alwaysShowPaginator"
    :paginator-template="props.paginatorTemplate"
    :page-link-size="props.pageLinkSize"
    :rows-per-page-options="props.rowsPerPageOptions"
    :current-page-report-template="props.currentPageReportTemplate"
    :lazy="props.lazy"
    :loading="props.loading"
    :loading-icon="props.loadingIcon"
    :sort-field="props.sortField"
    :sort-order="props.sortOrder"
    :null-sort-order="props.nullSortOrder"
    :default-sort-order="props.defaultSortOrder"
    :multi-sort-meta="props.multiSortMeta"
    :sort-mode="props.sortMode"
    :removable-sort="props.removableSort"
    :filter-display="props.filterDisplay || 'row'"
    :filter-locale="props.filterLocale"
    :selection-mode="props.selectionMode"
    :compare-selection-by="props.compareSelectionBy"
    :meta-key-selection="props.metaKeySelection"
    :context-menu="props.contextMenu"
    :context-menu-selection="props.contextMenuSelection"
    :select-all="props.selectAll"
    :row-hover="props.rowHover"
    :csv-separator="props.csvSeparator"
    :export-filename="props.exportFilename"
    :export-function="props.exportFunction"
    :resizable-columns="props.resizableColumns"
    :column-resize-mode="props.columnResizeMode"
    :reorderable-columns="props.reorderableColumns"
    :expanded-rows="props.expandedRows"
    :expanded-row-icon="props.expandedRowIcon"
    :collaspe-row-icon="props.collaspeRowIcon"
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
    :show-headers="props.showHeaders"
    :show-gridlines="props.showGridlines"
    :striped-rows="props.stripedRows"
    :highlight-on-select="props.highlightOnSelect"
    :size="props.size"
    :table-style="props.tableStyle"
    :table-class="props.tableClass"
    :table-props="props.tableProps"
    :filter-input-props="props.filterInputProps"
    :filter-button-props="{
      filter: { 
        pt: { 
          root: { 
            'ad-type': props.adType 
          } 
        } 
      }
    }"
    :edit-button-props="props.editButtonProps"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :open-dialog="props.openDialog"
    :selected-object="props.selectedObject"
    v-model:filters="props.filters"
    @update:filters="emits('update:filters', $event)"
    @row-click="props.openDialog?.('show', $event.data)"
    class="entity-datatable"
  >
    <Column
      v-for="col in specificColumns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :class="col.class"
      :sortable="col.sortable"
      :filter="true"
      filterMatchMode="contains"
    >
      <template #filter="{ filterModel, filterCallback }">
        <ad-input-text
          v-model="filterModel.value"
          :value="filterModel.value || ''"
          :placeholder="`Search by ${col.header}`"
          :ad-type="props.adType"
          @input="filterCallback()"
        />
      </template>
    </Column>
    <Column class="action-column">
      <template #body="row">
        <div class="action-column-content">
          <ad-button
            v-if="props.adType === 'activity'"
            :ad-type="props.adType"
            class="data-table-button"
            icon="prime:trash"
            rounded
            text
            :loading="props.loading"
            @click="openDialog!('delete', row.data)"
          />
          <template v-else>
            <ad-button
              v-for="action in actions"
              :key="action.icon"
              :ad-type="props.adType"
              media="desktop"
              variant="data-table"
              :icon="action.icon"
              rounded
              text
              :loading="props.loading"
              @click="action.click(row.data)"
            />
            <ad-button
              :ad-type="props.adType"
              media="mobile"
              variant="data-table"
              icon="prime:bars"
              rounded
              text
              :loading="props.loading"
              @click="openMenu(menu, $event, row.data)"
            />
            <ad-menu ref="menu" :model="selectItems" :popup="true" />
          </template>
        </div>
      </template>
    </Column>
  </ad-data-table>

  <nuc-entity-datatable-skeleton
    :rows="skeleton"
    :loading="props.loading"
    :specific-columns="specificColumns"
  />
</template>

<script setup lang="ts">
import type { NucEntityDatatableInterface } from 'atomic'
import { actions as actionsList, columns, useMenu, useSelect } from 'atomic'

const props = defineProps<NucEntityDatatableInterface>()
const emits = defineEmits<{ (e: 'update:filters', value: unknown): void }>()

const menu = ref()
const actions = actionsList(props.openDialog!)

const { openMenu, selectedObject } = useMenu()
const { selectItems } = useSelect(selectedObject, props.openDialog!)

const specificColumns = columns[props.adType as keyof typeof columns]
const skeleton = ref(new Array(props.rows))
</script>

<style lang="scss" scoped>
@import 'index';
</style>
