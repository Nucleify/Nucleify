<template>
  <Tree v-bind="transformProps(props)">
    <template #default="slotProps">
      <b :class="slotProps.node.class">{{ slotProps.node.label }}</b>
    </template>
    <template #url="slotProps">
      <a :href="slotProps.node.data" :class="slotProps.node.class">{{ slotProps.node.label }}</a>
    </template>
  </Tree>
  <slot />
</template>

<script setup lang="ts">
import type { TreeInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TreeInterface>()
</script>
