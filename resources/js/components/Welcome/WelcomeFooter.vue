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
                    :style="{ opacity: 0.13 + 0.008 * rowIndex }"
                >
                    <img
                        v-for="(opacity, imgIndex) in row[containerIndex]"
                        :key="imgIndex"
                        :alt="'hexagon-' + imgIndex"
                        :class="'hexagon-' + imgIndex"
                        src="hexagon.png"
                        width="40"
                        :style="{ opacity: opacity }"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'

const totalRows = 6
const imagesPerRow = ref(0)

function updateImagesPerRow(screenWidth: number) {
    switch (true) {
        case screenWidth < 400:
            imagesPerRow.value = 25
            break
        case screenWidth < 768:
            imagesPerRow.value = 35
            break
        case screenWidth >= 768 && screenWidth < 1024:
            imagesPerRow.value = 50
            break
        case screenWidth >= 1024:
            imagesPerRow.value = 90
            break
        default:
            imagesPerRow.value = 15
    }
}

updateImagesPerRow(window.innerWidth)

window.addEventListener('resize', () => {
    updateImagesPerRow(window.innerWidth)
})

function generateRowPattern(rowIndex: number) {
    const pattern = []
    const totalImages = imagesPerRow.value

    const onesCount = Math.ceil(((rowIndex + 1) * totalImages) / 10)

    for (let i = 0; i < totalImages; i++) {
        pattern.push(0)
    }

    pattern[Math.floor(Math.random() * totalImages)] = 1

    let placedOnes = 1
    while (placedOnes < onesCount) {
        const randomIndex = Math.floor(Math.random() * totalImages)
        if (pattern[randomIndex] === 0) {
            pattern[randomIndex] = 1
            placedOnes++
        }
    }

    const container1Pattern = pattern.slice(0, totalImages / 2)
    const container2Pattern = pattern.slice(totalImages / 2)

    return [container1Pattern, container2Pattern]
}

const hexagonRows: Ref = ref([])

function clearAndRegenerate() {
    hexagonRows.value = []
    for (let i = 0; i < totalRows; i++) {
        hexagonRows.value.push(generateRowPattern(i))
    }
}

clearAndRegenerate()

setInterval(clearAndRegenerate, 300)
</script>
