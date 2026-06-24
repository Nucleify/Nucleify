<template>
  <Chart
    v-if="props.data && props.type"
    :type="props.type"
    :data="props.data"
    :options="props.options"
    :plugins="props.plugins"
    :width="props.width"
    :height="props.height"
    :canvas-props="props.canvasProps"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :class="props.chartClass"
  >
    <slot />
  </Chart>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart'

import type { ChartInterface } from '.'

const props = defineProps<ChartInterface>()
</script>
