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
import { ref, onMounted, watch } from 'vue'

import {
    ActivityLogInterface,
    ArticleInterface,
    ChartInterface,
    ChartMethodType,
    ChartType,
    ContactInterface,
    UserInterface,
} from '@/types'
import { useChart } from '@/utils'

const props = defineProps<{
    type: ChartType
    chartMethodType: ChartMethodType
    activityLogData?: ActivityLogInterface[] | undefined
    articleData?: ArticleInterface[] | undefined
    contactData?: ContactInterface[] | undefined
    userData?: UserInterface[] | undefined
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
        props?.articleData,
        props?.contactData,
        props?.userData
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
            props?.userData
        )
    }
)
</script>
