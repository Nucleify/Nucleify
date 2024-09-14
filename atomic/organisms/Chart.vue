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
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :class="props.chartClass"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import { ChartInterface } from 'atomic/bosons/types'
import { useChart } from 'atomic/bosons/utils'

const props = defineProps<ChartInterface>()

const { chartData, setChartData, setChartOptions } = useChart()
const chartOptions = ref(setChartOptions(props.type, props.direction))

onMounted(() => {
    chartData.value = setChartData(
        props.chartMethodType,
        props?.activityLogData,
        props?.articleData,
        props?.contactData,
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
        props?.userData,
    ],
    () => {
        chartData.value = setChartData(
            props.chartMethodType,
            props?.activityLogData,
            props?.articleData,
            props?.contactData,
            props?.userData,
            props?.example
        )
    }
)
</script>
