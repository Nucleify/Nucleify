<template>
  <InputOtp
    v-bind="transformProps(props)"
    :class="$style['ad-inputotp']"
    :pt="{
    pcInputText: {
      root: {
        class: $style['ad-inputtext'],
        'ad-type': props.adType,
      }
    }
  }"
  >
    <slot />
  </InputOtp>
</template>

<script setup lang="ts">
import type { InputOtpInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputOtpInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>
