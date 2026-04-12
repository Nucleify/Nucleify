<template>
  <SelectButton
    v-bind="transformProps(props)"
    :pt="{
      pcToggleButton: {
        root: $style['ad-togglebutton'],
      }
    }"
  >
    <slot />
  </SelectButton>
</template>

<script setup lang="ts">
import type { SelectButtonInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SelectButtonInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>
