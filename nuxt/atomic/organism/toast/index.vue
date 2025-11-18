<template>
  <Toast 
    v-bind="transformProps(props)"
    :class="$style['ad-toast']"
    :pt="{
      message: $style['ad-toast-message'],
      messageContent: $style['ad-toast-message-content'],
      summary: $style['ad-toast-summary'],
      closeButton: $style['ad-toast-close-button'],
    }"
  >
    <slot />
  </Toast>
</template>

<script setup lang="ts">
import type { ToastInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ToastInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>