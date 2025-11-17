<template>
  <MeterGroup v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { MeterGroupInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<MeterGroupInterface>()
</script>
