<template>
  <Chart
    v-if="chartData"
    :type="props.type"
    :data="chartData"
    :options="chartOptions"
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
import { ref, onMounted, watch } from 'vue'

import Chart from 'primevue/chart' // Import for Storybook

import { ChartInterface, useChart } from '.'

const props = defineProps<ChartInterface>()

const { chartData, setChartData, setChartOptions } = useChart()
const chartOptions = ref(setChartOptions(props.type, props.direction))

onMounted(() => {
  chartData.value = setChartData(
    props.chartMethodType,
    props?.activityLogData,
    props?.articleData,
    props?.contactData,
    props?.moneyData,
    props?.questionData,
    props?.userData,
    props?.example
  )
})

watch(
  () => [
    props.chartMethodType,
    props?.activityLogData,
    props?.articleData,
    props?.contactData,
    props?.moneyData,
    props?.questionData,
    props?.userData,
  ],
  () => {
    chartData.value = setChartData(
      props.chartMethodType,
      props?.activityLogData,
      props?.articleData,
      props?.contactData,
      props?.moneyData,
      props?.questionData,
      props?.userData,
      props?.example
    )
  }
)
</script>
