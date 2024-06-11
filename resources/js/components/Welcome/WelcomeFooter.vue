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
import {Ref, ref} from 'vue'

const totalRows = 6
const imagesPerRow = 100

function generateRowPattern(rowIndex: number) {
    const pattern = []
    const totalImages = imagesPerRow

    const onesCount = Math.ceil(((rowIndex + 1) * totalImages) / 8.5)

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

const hexagonRows: Ref = ref([]);

function clearAndRegenerate() {
    hexagonRows.value = []
    for (let i = 0; i < totalRows; i++) {
        hexagonRows.value.push(generateRowPattern(i))
    }
}

clearAndRegenerate()

setInterval(clearAndRegenerate, 200)
</script>
