<template>
  <Dock
    v-bind="transformProps(props)"
    :class="[
      $style['ad-dock'],
      $style['ad-dock-' + props.position!],
    ]"
    :pt="{
      listContainer: $style['ad-dock-list-container'],
      list: $style['ad-dock-list'],
      item: $style['ad-dock-item'],
      itemLink: $style['ad-dock-item-link'],
    }"
  >
    <template #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
  </Dock>
</template>

<script setup lang="ts">
import type { DockInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DockInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>