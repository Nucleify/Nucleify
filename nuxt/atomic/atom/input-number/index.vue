<template>
  <InputNumber
    v-bind="transformProps(props)"
    :class="$style['ad-inputnumber']"
    :pt="{
      pcInputText: {
        root: {
          class: $style['ad-inputtext'],
          'nui-type': props.nuiType,
        } 
      },
    }"
  >
    <slot />
  </InputNumber>
</template>

<script setup lang="ts">
import type { InputNumberInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputNumberInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>
