<template>
  <Toast v-bind="transformProps(props)">
    <slot />
  </Toast>
</template>

<script setup lang="ts">
import type { ToastInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ToastInterface>()
</script>
