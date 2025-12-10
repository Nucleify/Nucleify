<template>
	<ad-chart 
		:data="chartData" 
		:options="chartOptions" 
		:type="props.type" 
		:chart-method-type="props.chartMethodType"
		:direction="props.direction" 
		:class="props.chartClass" 
		:example="props.example"
	/>
</template>

<script setup lang="ts">
import type { NucEntityChartInterface } from './types'
import { useChart } from './utils'

const props = defineProps<NucEntityChartInterface>()
const { chartData, setChartData, setChartOptions } = useChart()

const chartOptions = ref(setChartOptions(props.type, props.direction))

onMounted(() => {
  const initialData = setChartData(
    props.chartMethodType,
    props.data?.activity,
    props.data?.article,
    props.data?.card,
    props.data?.contact,
    props.data?.documentation,
    props.data?.feature,
    props.data?.file,
    props.data?.link,
    props.data?.money,
    props.data?.question,
    props.data?.task,
    props.data?.technology,
    props.data?.user,
    props.example
  )
  if (initialData) chartData.value = initialData

  let intervalId: ReturnType<typeof setInterval> | undefined
  if (props.example) {
    intervalId = setInterval(() => {
      const randomizedData = setChartData(
        props.chartMethodType,
        props.data?.activity,
        props.data?.article,
        props.data?.card,
        props.data?.contact,
        props.data?.documentation,
        props.data?.feature,
        props.data?.file,
        props.data?.link,
        props.data?.money,
        props.data?.question,
        props.data?.task,
        props.data?.technology,
        props.data?.user,
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
  () => ({
    method: props.chartMethodType,
    example: props.example,
    data: props.data,
  }),
  () => {
    const watchedData = setChartData(
      props.chartMethodType,
      props.data?.activity,
      props.data?.article,
      props.data?.card,
      props.data?.contact,
      props.data?.documentation,
      props.data?.feature,
      props.data?.file,
      props.data?.link,
      props.data?.money,
      props.data?.question,
      props.data?.task,
      props.data?.technology,
      props.data?.user,
      props.example
    )
    if (watchedData) chartData.value = watchedData
  },
  { immediate: true, deep: true }
)
</script>