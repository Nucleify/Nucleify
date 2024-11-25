<template>
  <section id="footer">
    <div class="footer-content-container">
      <div class="top">
        <ad-anchor href="#start" class="header">
          <ad-image :src="imgUrl + 'logo.svg'" class="logo" />
          <ad-heading :tag="1" text="DataManager" class="name" />
        </ad-anchor>
        <div class="content">
          <div class="entities">
            <ad-heading :tag="3" text="Entities" />
            <ad-anchor href="/activity-log" text="Activities" />
            <ad-anchor href="/articles" text="Articles" />
            <ad-anchor text="Calendar" />
            <ad-anchor href="/contacts" text="Contacts" />
            <ad-anchor text="Money" />
            <ad-anchor href="/admin" text="Users" />
          </div>
          <div class="services">
            <ad-heading :tag="3" text="Services" />
            <ad-anchor text="Open Source" />
            <ad-anchor text="Data Storage" />
            <ad-anchor text="Data Migration" />
            <ad-anchor text="Data Integration" />
            <ad-anchor text="Data Analysis" />
            <ad-anchor text="Page Builder" />
          </div>
          <div class="about">
            <ad-heading :tag="3" text="About" />
            <ad-anchor text="Purpose" />
            <ad-anchor text="Collaboration" />
            <ad-anchor text="Support Us" />
            <ad-anchor text="License" />
            <ad-anchor text="Contact" />
          </div>
          <div class="blog">
            <ad-heading :tag="3" text="Blog" />
            <ad-anchor text="The Importance of Open Source in Today's World" />
            <ad-anchor text="How to Automate Your Data Pipeline" />
            <ad-anchor text="Maximizing Data Security" />
            <ad-anchor text="Building a Scalable Website" />
            <ad-anchor text="The Best Tools for Every Business" />
          </div>
        </div>
      </div>
      <div class="bottom">
        <ad-anchor
          href="https://github.com/SzymCode"
          label="SzymCode"
          class="author"
        >
          <ad-image :src="imgUrl + 'szymcode.svg'" class="logo" />
        </ad-anchor>

        <ad-anchor
          href="mailto:szymon.radomski@yahoo.com"
          label="szymon.radomski@yahoo.com"
          class="email"
        />
      </div>
    </div>
    <DeferredContent>
      <div class="hexagon-rows-container">
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
              :src="imgUrl + 'hexagon.svg'"
              width="40"
              :style="{ opacity: opacity }"
            />
          </div>
        </div>
      </div>
    </DeferredContent>
  </section>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, onBeforeUnmount } from 'vue'

const totalRows = ref(10)
const imagesPerRow = ref(0)
const hexagonRows: Ref<number[][][]> = ref([])

const hexagonWidth = 40

function updateImagesPerRow(screenWidth: number) {
  imagesPerRow.value = Math.floor(screenWidth / hexagonWidth) * 2 + 1
}

function generateRowPattern(rowIndex: number) {
  const totalImages = imagesPerRow.value
  const onesCount = Math.ceil(((rowIndex + 1) * totalImages) / 15)
  const pattern = new Array(totalImages).fill(0)

  let placedOnes = 0
  while (placedOnes < onesCount) {
    const randomIndex = Math.floor(Math.random() * totalImages)
    if (pattern[randomIndex] === 0) {
      pattern[randomIndex] = 1
      placedOnes++
    }
  }

  const half = Math.floor(totalImages / 2)
  return [pattern.slice(0, half), pattern.slice(half)]
}

function updateHexagonPatterns() {
  for (let i = 0; i < totalRows.value; i++) {
    hexagonRows.value[i] = generateRowPattern(i)
  }
}

let resizeTimeout: number | null = null

function handleResize() {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  resizeTimeout = window.setTimeout(() => {
    updateImagesPerRow(window.innerWidth)
    updateHexagonPatterns()
  }, 200)
}

onMounted(() => {
  updateImagesPerRow(window.innerWidth)
  updateHexagonPatterns()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

if (window.innerWidth < 992) {
  setInterval(updateHexagonPatterns, 700)
  totalRows.value = 11
} else {
  setInterval(updateHexagonPatterns, 350)
  totalRows.value = 9
}
</script>
