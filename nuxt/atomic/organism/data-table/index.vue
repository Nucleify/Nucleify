<template>
  <DataTable
    v-if="props.value && !props.loading"
    v-bind="transformProps(props, excludedProps)"
    v-model:filters="props.filters"
    @update:filters="emits('update:filters', $event)"
    :rows="props.rows || 10"
    :paginator="props.paginator || true"
    :show-headers="props.showHeaders|| true"
    :striped-rows="props.stripedRows || true"
    :row-hover="props.rowHover || true"
    :pt="{
      root: $style['ad-datatable'],
      bodyRow: $style['ad-datatable-row'],
      columnHeaderContent: $style['ad-datatable-column-header-content'],
      pcPaginator: {
        paginatorContainer: $style['ad-datatable-paginator-bottom'],
        root: $style['ad-datatable-paginator'],
        content: $style['ad-datatable-paginator-content'],
        first: $style['ad-datatable-paginator-first'],
        prev: $style['ad-datatable-paginator-prev'],
        current: $style['ad-datatable-paginator-current'],
        next: $style['ad-datatable-paginator-next'],
        last: $style['ad-datatable-paginator-last'],
        pcRowPerPageDropdown: {
          root: {
            class: $style['ad-select'], 
            'ad-type': props.adType
          },
          label: $style['ad-select-label'],
          dropdown: $style['ad-select-dropdown'],
          overlay: {
            class: $style['ad-select-overlay'],
            'ad-type': props.adType,
          },
          listContainer: $style['ad-select-list-container'],
          list: $style['ad-select-list'],
          option: $style['ad-select-option'],
        },
      }
    }"
  >
    <slot />
    <Column
      v-if="!hasSlotContent"
      v-for="col in autoColumns"
      :key="col"
      :field="col"
      :header="capitalize(col)"
      sortable
    />
  </DataTable>
</template>

<script setup lang="ts">
import { Column } from 'primevue'
import { computed, useSlots } from 'vue'

import type { DataTableInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DataTableInterface>()
const emits = defineEmits<{ (e: 'update:filters', value: unknown): void }>()
const slots = useSlots()

const hasSlotContent = computed(() => !!slots.default)

const autoColumns = computed(() => {
  if (!Array.isArray(props.value) || props.value.length === 0) return []
  return Object.keys(props.value[0] as Record<string, unknown>)
})

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const excludedProps = [
  'loading',
  'actions',
  'openDialog',
  'selectedObject',
  'rows',
]
</script>

<style lang="scss" module>
@import 'index';
</style>
