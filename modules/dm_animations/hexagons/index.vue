<template>
  <div ref="containerRef" class="hexagon-rows-container">
    <div
      v-for="(row, rowIndex) in hexagonRows"
      :key="rowIndex"
      class="hexagon-row-container"
    >
      <div
        v-for="(containerClass, containerIndex) in [
          'hexagon-container n1',
          'hexagon-container n2',
        ]"
        :key="containerIndex"
        :class="containerClass"
        :style="{ opacity: 0.05 + 0.012 * rowIndex }"
      >
        <img
          v-for="(opacity, imgIndex) in row[containerIndex]"
          :key="imgIndex"
          :alt="'hexagon-' + imgIndex"
          :class="'hexagon-' + imgIndex"
          src="/img/hexagon.svg"
          width="40"
          :style="{ opacity: opacity }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { updateImagesPerRow } from './utils'
import { PATTERN_UPDATE_INTERVAL } from './variables'

const containerRef = ref<HTMLElement | null>(null)
const imagesPerRow = ref(0)
const totalRows = ref(0)
const hexagonRows = ref<number[][][]>([])

onMounted(() => {
  const resizeObserver = new ResizeObserver(() => {
    updateImagesPerRow(containerRef, imagesPerRow, totalRows, hexagonRows)
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  updateImagesPerRow(containerRef, imagesPerRow, totalRows, hexagonRows)

  const interval = setInterval(() => {
    updateImagesPerRow(containerRef, imagesPerRow, totalRows, hexagonRows)
  }, PATTERN_UPDATE_INTERVAL)

  onBeforeUnmount(() => {
    if (containerRef.value) {
      resizeObserver.unobserve(containerRef.value)
    }
    resizeObserver.disconnect()
    clearInterval(interval)
  })
})
</script>
