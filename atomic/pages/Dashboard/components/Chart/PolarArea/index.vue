<template>
  <ad-card class="polar-area-chart-card">
    <template #content>
      <Chart type="polarArea" :data="chartData" :options="chartOptions" />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import {
  useColors,
  PolarChartInterface,
  UseColorsReturnInterface,
} from 'atomic'

const {
  articleItemColors,
  contactItemColors,
  moneyItemColors,
}: UseColorsReturnInterface = useColors()

const props = defineProps<PolarChartInterface>()

const chartData = ref({
  labels: ['Articles', 'Contacts', 'Money'],
  datasets: [
    {
      label: 'Requests Data',
      data: [props.articles.length, props.contacts.length, props.money.length],
      backgroundColor: [
        articleItemColors.secondary,
        contactItemColors.secondary,
        moneyItemColors.secondary,
      ],
      borderColor: [
        articleItemColors.primary,
        contactItemColors.primary,
        moneyItemColors.primary,
      ],
    },
  ],
})

const chartOptions = ref({
  plugins: {
    legend: {
      labels: false,
    },
  },
  scales: {
    r: {
      grid: false,
      ticks: {
        display: false,
      },
    },
  },
})

watchEffect(() => {
  chartData.value.datasets[0].data = [
    props.articles.length,
    props.contacts.length,
    props.money.length,
  ]
})
</script>

<style lang="scss">
#dashboard {
  .polar-area-chart-card {
    .p-card-body {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.75em 1.25em 1.5em;

      .p-card-caption {
        display: none;
      }

      .p-card-content {
        width: 100%;
        height: 100%;

        .p-chart canvas {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
