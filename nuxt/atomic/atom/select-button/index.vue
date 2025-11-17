<template>
  <SelectButton 
    v-bind="transformProps(props)" 
    :pt="{
      pcToggleButton: {
        root: $style['ad-togglebutton'],
      }
    }"
  />
</template>

<script setup lang="ts">
import { SelectButton } from 'primevue' // Import for Storybook

import type { SelectButtonInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SelectButtonInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>