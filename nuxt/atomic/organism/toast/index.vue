<template>
  <Toast
    :group="props.group"
    :position="props.position"
    :auto-z-index="props.autoZIndex"
    :base-z-index="props.baseZIndex"
    :breakpoints="props.breakpoints"
    :close-icon="props.closeIcon"
    :info-icon="props.infoIcon"
    :warn-icon="props.warnIcon"
    :error-icon="props.errorIcon"
    :success-icon="props.successIcon"
    :close-button-props="props.closeButtonProps"
    :message="props.message"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <slot />
  </Toast>
</template>

<script setup lang="ts">
import type { ToastInterface } from 'atomic'

const props = defineProps<ToastInterface>()
</script>
