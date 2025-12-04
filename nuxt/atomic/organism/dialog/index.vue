<template>
  <Dialog
    v-bind="transformProps(props)"
    :modal="props.modal || true"
    :show-header="props.showHeader || true"
  >
    <template #header>
      <slot name="header" />
    </template>

    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { DialogInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DialogInterface>()
</script>

<style lang="scss">
@import 'index';
</style>