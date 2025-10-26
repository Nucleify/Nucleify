<template>
  <Chart
    v-if="props.data"
    v-bind="transformProps(props, excludedProps)"
    :class="props.chartClass"
  />
</template>

<script setup lang="ts">
import type { ChartInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ChartInterface>()

const excludedProps = ['chartClass']
</script>
