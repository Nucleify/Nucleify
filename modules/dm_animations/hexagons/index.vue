<template>
  <div ref="containerRef" class="hexagon-rows-container">
    <client-only>
      <deferred-content>
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
            :style="{ opacity: 0.125 + 0.012 * rowIndex }"
          >
            <svg
              :width="row[containerIndex].length * 40"
              height="40"
              style="display: block"
            >
              <polygon
                v-for="(opacity, imgIndex) in row[containerIndex]"
                :key="imgIndex"
                :class="'hexagon-' + imgIndex"
                :style="{ opacity: opacity }"
                :points="getHexagonPoints(20 + imgIndex * 40, 20, 20)"
                stroke="#10b981"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </deferred-content>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { getHexagonPoints, updateImagesPerRow } from './utils'
import { PATTERN_UPDATE_INTERVAL } from './variables'

const containerRef = ref<HTMLElement | null>(null)
const imagesPerRow = ref(0)
const totalRows = ref(0)
const hexagonRows = ref<number[][][]>([])

onMounted(() => {
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null

  const resizeObserver = new ResizeObserver(() => {
    if (resizeTimeout) clearTimeout(resizeTimeout)

    resizeTimeout = setTimeout(() => {
      updateImagesPerRow(containerRef, imagesPerRow, totalRows, hexagonRows)
    }, 100)
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  updateImagesPerRow(containerRef, imagesPerRow, totalRows, hexagonRows)

  const interval = setInterval(() => {
    requestAnimationFrame(() => {
      updateImagesPerRow(containerRef, imagesPerRow, totalRows, hexagonRows)
    })
  }, PATTERN_UPDATE_INTERVAL)

  onBeforeUnmount(() => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    if (containerRef.value) {
      resizeObserver.unobserve(containerRef.value)
    }
    resizeObserver.disconnect()
    clearInterval(interval)
  })
})
</script>

<style lang="scss">
@import 'index';
</style>
