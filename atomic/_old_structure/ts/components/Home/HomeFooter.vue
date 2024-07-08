<template>
    <section id="footer">
        <div class="hexagonRowsContainer">
            <div
                v-for="(row, rowIndex) in hexagonRows"
                :key="rowIndex"
                class="hexagonRowContainer"
            >
                <div
                    v-for="(containerClass, containerIndex) in [
                        'hexagonContainer n1',
                        'hexagonContainer n2',
                    ]"
                    :key="containerIndex"
                    :class="containerClass"
                    :style="{ opacity: 0.05 + 0.01 * rowIndex }"
                >
                    <img
                        v-for="(opacity, imgIndex) in row[containerIndex]"
                        :key="imgIndex"
                        :alt="'hexagon-' + imgIndex"
                        :class="'hexagon-' + imgIndex"
                        :src="hexagon"
                        width="40"
                        :style="{ opacity: opacity }"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import hexagon from '/public/hexagon.svg'
import { Ref, ref, onMounted, onBeforeUnmount } from 'vue'

const totalRows = 5
const imagesPerRow = ref(0)
const hexagonRows: Ref<number[][][]> = ref([])

const hexagonWidth = 40

function updateImagesPerRow(screenWidth: number) {
    imagesPerRow.value = Math.floor(screenWidth / hexagonWidth) * 2 + 1
}

function generateRowPattern(rowIndex: number) {
    const totalImages = imagesPerRow.value
    const onesCount = Math.ceil(((rowIndex + 1) * totalImages) / 10)
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
    for (let i = 0; i < totalRows; i++) {
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

setInterval(updateHexagonPatterns, 350)

</script>
