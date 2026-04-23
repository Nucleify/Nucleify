<template>
  <Dialog
    v-bind="transformProps(props, ['visible'])"
    :visible="props.visible"
    :modal="props.modal || true"
    :show-header="props.showHeader || true"
    :dismissable-mask="props.dismissableMask || true"
    :class="$style['ad-dialog']"
    :pt="{
      mask: $style['ad-dialog-mask'],
      header: $style['ad-dialog-header'],
      headerIcon: $style['ad-dialog-header-icon'],
      content: $style['ad-dialog-content'],
      footer: $style['ad-dialog-footer'],
    }"
    @update:visible="onVisibleUpdate"
  >
    <template #header> <slot name="header" /> </template>

    <slot />

    <template #footer> <slot name="footer" /> </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { DialogInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DialogInterface>()
const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

function onVisibleUpdate(value: boolean): void {
  emit('update:visible', value)
}
</script>

<style lang="scss" module>
@import 'index';
</style>
