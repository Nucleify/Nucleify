<template>
  <ad-chart 
    :data="chartData" 
    :options="chartOptions" 
    :type="props.type" 
    :chart-method-type="props.chartMethodType"
    :direction="props.direction" 
    :chart-class="props.chartClass" 
    :example="props.example"
  />
</template>

<script setup lang="ts">
import type { DMEntityChartInterface } from './types'
import { useChart } from './utils'

const props = defineProps<DMEntityChartInterface>()
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
    props?.fileData,
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
        props?.fileData,
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
    props?.fileData,
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
      props?.fileData,
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