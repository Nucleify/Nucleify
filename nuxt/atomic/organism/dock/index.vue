<template>
  <Dock
    v-bind="transformProps(props)"
  >
    <template #icon="slotProps">
      <slot name="icon" v-bind="slotProps" />
    </template>
  </Dock>
</template>

<script setup lang="ts">
import { transformProps } from 'atomic'

import type { DockInterface } from '.'

const props = defineProps<DockInterface>()
</script>

<style lang="scss">
@import 'index';
</style>