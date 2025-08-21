<template>
  <Chart
    v-if="props.data"
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
    :class="props.chartClass"
  />
</template>

<script setup lang="ts">
import type { ChartInterface } from 'atomic'

const props = defineProps<ChartInterface>()
</script>
