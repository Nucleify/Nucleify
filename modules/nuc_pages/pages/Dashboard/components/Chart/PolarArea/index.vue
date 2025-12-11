<template>
  <ad-card class="polar-area-chart-card">
    <template #content>
      <Chart type="polarArea" :data="chartData" :options="chartOptions" />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import type { PolarChartInterface, UseColorsInterface } from 'atomic'
import { useColors } from 'atomic'

const { colors }: UseColorsInterface = useColors()

const props = defineProps<PolarChartInterface>()

const chartData = ref({
  labels: ['Articles', 'Contacts', 'Money'],
  datasets: [
    {
      data: [props.articles.length, props.contacts.length, props.money.length],
      backgroundColor: [
        colors.article.secondary,
        colors.contact.secondary,
        colors.money.secondary,
      ],
      borderColor: [
        colors.article.primary,
        colors.contact.primary,
        colors.money.primary,
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
