<template>
  <SpeedDial v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { SpeedDialInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SpeedDialInterface>()
</script>
