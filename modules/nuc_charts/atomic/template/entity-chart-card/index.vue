<template>
  <ad-card 
    v-if="displayCharts[props.entity as keyof NucDisplayChartsStateInterface]" 
    class="nuc-card-base entity-chart-card"
  >
    <template #content>
      <nuc-entity-chart
        :data="props.data"
        :chart-method-type="props.chartMethodType"
        :type="props.type"
        :direction="props.direction"
        :class="props.chartClass + ' ' + (props.loading ? 'chart-loading' : 'chart-loaded')"
      />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type {
  NucDisplayChartsStateInterface,
  NucEntityChartCardInterface,
} from 'atomic'
import { useDisplayChartsStore } from 'atomic'

const props = defineProps<NucEntityChartCardInterface>()

const displayCharts = useDisplayChartsStore()
</script>
