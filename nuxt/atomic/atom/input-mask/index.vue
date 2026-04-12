<template>
  <InputMask v-bind="transformProps(props)" :class="$style['ad-inputmask']">
    <slot />
  </InputMask>
</template>

<script setup lang="ts">
import type { InputMaskInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputMaskInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>
