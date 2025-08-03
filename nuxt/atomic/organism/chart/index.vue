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
import { onMounted, onUnmounted, ref, watch } from 'vue'

import type { ChartInterface } from 'atomic'
import { useChart } from 'atomic'

const props = defineProps<ChartInterface>()

const { chartData, setChartData, setChartOptions } = useChart()
const chartOptions = ref(setChartOptions(props.type, props.direction))

onMounted(() => {
  const initialData = setChartData(
    props.chartMethodType,
    props?.activityLogData,
    props?.articleData,
    props?.cardData,
    props?.contactData,
    props?.featureData,
    props?.linkData,
    props?.moneyData,
    props?.questionData,
    props?.taskData,
    props?.technologyData,
    props?.userData,
    props?.example
  )
  if (initialData) chartData.value = initialData

  let intervalId: ReturnType<typeof setInterval> | undefined
  if (props.example) {
    intervalId = setInterval(() => {
      const randomizedData = setChartData(
        props.chartMethodType,
        props?.activityLogData,
        props?.articleData,
        props?.cardData,
        props?.contactData,
        props?.featureData,
        props?.linkData,
        props?.moneyData,
        props?.questionData,
        props?.taskData,
        props?.technologyData,
        props?.userData,
        true
      )
      if (randomizedData) chartData.value = randomizedData
    }, 3000)
  }
  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })
})

watch(
  () => [
    props.chartMethodType,
    props?.activityLogData,
    props?.articleData,
    props?.cardData,
    props?.contactData,
    props?.featureData,
    props?.linkData,
    props?.moneyData,
    props?.questionData,
    props?.taskData,
    props?.technologyData,
    props?.userData,
  ],
  () => {
    const watchedData = setChartData(
      props.chartMethodType,
      props?.activityLogData,
      props?.articleData,
      props?.cardData,
      props?.contactData,
      props?.featureData,
      props?.linkData,
      props?.moneyData,
      props?.questionData,
      props?.taskData,
      props?.technologyData,
      props?.userData,
      props?.example
    )
    if (watchedData) chartData.value = watchedData
  },
  { immediate: true }
)
</script>
