<template>
    <Card class="myCard w-full lg:ml-2 lg:mr-5 mt-1 lg:px-2 xl:px-4">
        <template #content>
            <Chart
                v-if="chartData"
                type="bar"
                :data="chartData"
                :options="chartOptions"
                class="h-30rem"
            />
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { defineProps } from 'vue'
import {
    ActivityLogInterface,
    ChartInterface,
    ContactInterface,
    UserInterface,
} from '../../interfaces'

import { useChart } from '../../utils'

const props = defineProps<{
    activityLogData?: ActivityLogInterface[]
    contactData?: ContactInterface[]
    userData?: UserInterface[]
}>()

const { setChartData, setChartOptions } = useChart()
const chartData = ref<ChartInterface | null>(null)
const chartOptions = ref(setChartOptions())

onMounted(() => {
    chartData.value = setChartData(
        props?.activityLogData,
        props?.contactData,
        props?.userData
    )
})

watch(
    () => [props?.activityLogData, props?.contactData, props?.userData],
    () => {
        chartData.value = setChartData(
            props?.activityLogData,
            props?.contactData,
            props?.userData
        )
    }
)
</script>
