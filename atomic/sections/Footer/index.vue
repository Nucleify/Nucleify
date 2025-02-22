<template>
  <section id="footer">
    <div class="footer-content-container">
      <div class="top">
        <ad-anchor href="#start" class="header">
          <ad-image :src="imgUrl + 'logo.svg'" class="logo" />
          <ad-heading :tag="1" text="DataManager" class="name" />
        </ad-anchor>
        <div class="content">
          <div
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="`column-${columnIndex + 1}`"
          >
            <template v-for="(item, itemIndex) in column" :key="itemIndex">
              <ad-anchor :href="item.url" v-if="item?.header">
                <ad-heading :tag="3" :text="item.name" />
              </ad-anchor>
              <ad-anchor v-else :href="item.url" :text="item.name" />
            </template>
          </div>
        </div>
      </div>
      <div class="bottom">
        <ad-anchor href="https://github.com/Atomic-IT" class="authors">
          made by Atomic IT
          <img src="/logo.png" width="28" height="28" alt="Atomic IT logo" />
        </ad-anchor>
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

const columns = [
  // Entities
  [
    { name: 'Entities', url: '/entities', header: true },
    { name: 'Activities', url: '/activity-log' },
    { name: 'Articles', url: '/entities/articles' },
    { name: 'Contacts', url: '/entities/contacts' },
    { name: 'Money', url: '/entities/money' },
    { name: 'Users', url: '/admin' },
  ],
  // Services
  [
    { name: 'Services', url: '/services', header: true },
    { name: 'Open Source' },
    { name: 'Data Storage' },
    { name: 'Data Migration' },
    { name: 'Data Integration' },
    { name: 'Data Analysis' },
    { name: 'Page Builder' },
  ],
  // About
  [
    { name: 'About', url: '/about', header: true },
    { name: 'Purpose' },
    { name: 'Collaboration' },
    { name: 'Support Us' },
    { name: 'License' },
    { name: 'Contact' },
  ],
  // Blog
  [
    { name: 'Blog', url: '/blog', header: true },
    { name: "The Importance of Open Source in Today's World" },
    { name: 'How to Automate Your Data Pipeline' },
    { name: 'Maximizing Data Security' },
    { name: 'Building a Scalable Website' },
    { name: 'The Best Tools for Every Business' },
  ],
]

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
  totalRows.value = 10
} else {
  setInterval(updateHexagonPatterns, 350)
  totalRows.value = 8
}
</script>
