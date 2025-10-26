<template>
  <DataTable
    v-if="props.value && !props.loading"
    v-bind="transformProps(props, excludedProps)"
    v-model:filters="props.filters"
    @update:filters="emits('update:filters', $event)"
  >
    <slot />
  </DataTable>
</template>

<script setup lang="ts">
import type { DataTableInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DataTableInterface>()
const emits = defineEmits<{ (e: 'update:filters', value: unknown): void }>()

const excludedProps = ['loading', 'actions', 'openDialog', 'selectedObject']
</script>