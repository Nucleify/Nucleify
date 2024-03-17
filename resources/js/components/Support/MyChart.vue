<template>
    <Chart
        v-if="chartData"
        :type="type"
        :data="chartData"
        :options="chartOptions"
        :class="chartClass"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue'
import {
    ActivityLogInterface,
    ChartInterface,
    ChartMethodType,
    ChartType,
    ContactInterface,
    UserInterface,
} from '../../interfaces'

import { useChart } from '../../utils'

const props = defineProps<{
    type: ChartType
    chartMethodType: ChartMethodType
    activityLogData?: ActivityLogInterface[]
    contactData?: ContactInterface[]
    userData?: UserInterface[]
    chartClass: string | undefined
}>()

const { setChartData, setChartOptions } = useChart()
const chartData = ref<ChartInterface | null>(null)
const chartOptions = ref(setChartOptions(props.type))
const chartClass = props.chartClass

onMounted(() => {
    chartData.value = setChartData(
        props.chartMethodType,
        props?.activityLogData,
        props?.contactData,
        props?.userData
    )
})

watch(
    () => [
        props.chartMethodType,
        props?.activityLogData,
        props?.contactData,
        props?.userData,
    ],
    () => {
        chartData.value = setChartData(
            props.chartMethodType,
            props?.activityLogData,
            props?.contactData,
            props?.userData
        )
    }
)
</script>
