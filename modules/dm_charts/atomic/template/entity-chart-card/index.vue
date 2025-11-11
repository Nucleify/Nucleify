<template>
  <ad-card 
    v-if="displayCharts[props.entity as keyof DMDisplayChartsStateInterface]" 
    class="dm-card-base entity-chart-card"
  >
    <template #content>
      <dm-entity-chart
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
  DMDisplayChartsStateInterface,
  DMEntityChartCardInterface,
} from 'atomic'
import { useDisplayChartsStore } from 'atomic'

const props = defineProps<DMEntityChartCardInterface>()

const displayCharts = useDisplayChartsStore()
</script>
