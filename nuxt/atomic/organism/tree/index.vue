<template>
  <Tree
    :value="props.value"
    :expanded-keys="props.expandedKeys"
    :selected-keys="props.selectedKeys"
    :selection-mode="props.selectionMode"
    :meta-key-selection="props.metaKeySelection"
    :loading="props.loading"
    :loading-icon="props.loadingIcon"
    :loading-mode="props.loadingMode"
    :filter="props.filter"
    :filter-by="props.filterBy"
    :filter-mode="props.filterMode"
    :filter-placeholder="props.filterPlaceholder"
    :filter-locale="props.filterLocale"
    :highlight-on-select="props.highlightOnSelect"
    :scroll-height="props.scrollHeight"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <template #default="slotProps">
      <b :class="slotProps.node.class">{{ slotProps.node.label }}</b>
    </template>
    <template #url="slotProps">
      <a :href="slotProps.node.data" :class="slotProps.node.class">{{ slotProps.node.label }}</a>
    </template>
  </Tree>
</template>

<script setup lang="ts">
import type { TreeInterface } from 'atomic'

const props = defineProps<TreeInterface>()
</script>
