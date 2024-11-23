<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useColors, useDisplayCharts } from 'atomic/bosons/utils'

const { setDefaultColors } = useColors()
const { setDefaultChartsDisplay } = useDisplayCharts()

onMounted(() => {
  setDefaultColors(true)
  setDefaultChartsDisplay(true)
})
</script>
