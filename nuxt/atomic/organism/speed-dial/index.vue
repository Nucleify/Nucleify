<template>
  <SpeedDial v-bind="transformProps(props)">
    <template v-for="(_, name) in $slots" #[name]="slotData" :key="name">
      <slot :name="name" v-bind="slotData" />
    </template>
  </SpeedDial>
</template>

<script setup lang="ts">
import type { SpeedDialInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SpeedDialInterface>()
</script>
