<template>
    <section id="footer">
        <div class="footerContentContainer" v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout', rootMargin: isMobile() ? '250px' : '100px' }">
            <div class="top">
                <anchor-molecule href="#start" class="brandHeader">
                    <image-atom src="logo.svg" class="logo" />
                    <heading-atom :tag="1" text="DataManager" class="brandName" />
                </anchor-molecule>
                <div class="content">
                    <div class="entities">
                        <heading-atom :tag="3" text="Entities" />
                        <anchor-molecule href="/activity-log" text="Activities" />
                        <anchor-molecule href="/articles" text="Articles" />
                        <anchor-molecule text="Calendar" />
                        <anchor-molecule href="/contacts" text="Contacts" />
                        <anchor-molecule text="Money" />
                        <anchor-molecule href="/admin" text="Users" />
                    </div>
                    <div class="services">
                        <heading-atom :tag="3" text="Services" />
                        <anchor-molecule text="Open Source" />
                        <anchor-molecule text="Data Storage" />
                        <anchor-molecule text="Data Migration" />
                        <anchor-molecule text="Data Integration" />
                        <anchor-molecule text="Data Analysis" />
                        <anchor-molecule text="Page Builder" />
                    </div>
                    <div class="about">
                        <heading-atom :tag="3" text="About" />
                        <anchor-molecule text="Purpose" />
                        <anchor-molecule text="Collaboration" />
                        <anchor-molecule text="Support Us" />
                        <anchor-molecule text="License" />
                        <anchor-molecule text="Contact" />
                    </div>
                    <div class="blog">
                        <heading-atom :tag="3" text="Blog" />
                        <anchor-molecule text="The Importance of Open Source in Today's World" />
                        <anchor-molecule text="How to Automate Your Data Pipeline" />
                        <anchor-molecule text="Maximizing Data Security" />
                        <anchor-molecule text="Building a Scalable Website" />
                        <anchor-molecule text="The Best Tools for Every Business" />
                    </div>
                </div>
            </div>
            <div class="bottom">
                <anchor-molecule href="https://github.com/SzymCode" label="SzymCode" class="author">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 248 248">
                        <path d="M0 0 C1.66142396 0.02516817 3.32288557 0.047966 4.984375 0.06835938 C8.9913221 0.11824666 12.99284939 0.21617426 17 0.3125 C17 5.9225 17 11.5325 17 17.3125 C15.16695313 17.36148438 13.33390625 17.41046875 11.4453125 17.4609375 C9.00519475 17.53601805 6.56509127 17.61156355 4.125 17.6875 C2.92101562 17.7184375 1.71703125 17.749375 0.4765625 17.78125 C-12.24581754 18.19611022 -25.62469817 19.67677312 -35 29.3125 C-42.35924614 39.82570877 -44.00105555 49.66166044 -43 62.3125 C-40.95314656 71.18607484 -35.56198313 79.27351768 -27.91796875 84.28515625 C-17.9668201 89.61540491 -7.06691442 89.52299723 3.9375 89.875 C5.19369141 89.91818359 6.44988281 89.96136719 7.74414062 90.00585938 C10.82931384 90.11143564 13.9146435 90.21242287 17 90.3125 C17 95.9225 17 101.5325 17 107.3125 C12.12839911 107.4052924 7.25997064 107.48462262 2.38818359 107.53222656 C0.73768621 107.55210821 -0.912743 107.57922356 -2.56298828 107.61425781 C-20.56280001 107.9862904 -36.26952437 104.85592522 -49.875 92 C-60.20283099 80.9438048 -65.40412941 66.86529794 -65.1484375 51.75390625 C-64.39176884 39.30869796 -60.28614553 27.72115293 -52 18.3125 C-51.47664062 17.70792969 -50.95328125 17.10335937 -50.4140625 16.48046875 C-36.93780619 1.9602771 -18.73261764 -0.50244369 0 0 Z " fill="#EEEEEE" transform="translate(193,67.6875)"/>
                        <path d="M0 0 C1.73697401 0.01004968 3.47395364 0.01917202 5.2109375 0.02734375 C9.43254653 0.04748501 13.65336183 0.0866602 17.875 0.125 C17.875 6.065 17.875 12.005 17.875 18.125 C14.15089844 18.18107422 14.15089844 18.18107422 10.3515625 18.23828125 C7.91544374 18.28464903 5.47946942 18.33582676 3.04345703 18.38745117 C1.36581387 18.42046296 -0.31193402 18.44856676 -1.98974609 18.47143555 C-16.96318549 18.68101019 -27.95804849 19.77243595 -38.875 30.9375 C-45.22276537 39.93016761 -46.03952154 48.36067192 -47.125 59.125 C-53.725 59.125 -60.325 59.125 -67.125 59.125 C-67.71954508 43.22091907 -64.85068451 30.04756448 -54.5 17.5 C-39.60750768 1.459778 -20.47939762 -0.20682318 0 0 Z " fill="#EDEDED" transform="translate(103.125,67.875)"/>
                        <path d="M0 0 C6.93 0 13.86 0 21 0 C20.54900807 17.13769327 16.90356546 30.31330523 5 43 C-6.17160384 52.85419773 -19.70143144 57.38354334 -34.41015625 57.1953125 C-35.26306747 57.1924826 -36.1159787 57.18965271 -36.99473572 57.18673706 C-39.68414118 57.17565831 -42.37319742 57.15057793 -45.0625 57.125 C-46.90038577 57.11495425 -48.73827683 57.10583121 -50.57617188 57.09765625 C-55.05101977 57.077472 -59.52512502 57.03830136 -64 57 C-64 51.39 -64 45.78 -64 40 C-61.96199219 39.95101562 -59.92398438 39.90203125 -57.82421875 39.8515625 C-55.81175069 39.79585404 -53.79928393 39.74008122 -51.78686523 39.68261719 C-50.40706245 39.64474843 -49.02717498 39.6098292 -47.6472168 39.578125 C-33.25234974 39.24348225 -19.20742366 38.80951909 -8.625 27.875 C-1.76930592 19.49581835 -0.49663962 10.55359191 0 0 Z " fill="#EEEEEE" transform="translate(100,118)"/>
                    </svg>
                </anchor-molecule>

                <anchor-molecule href="mailto:szymon.radomski@yahoo.com" label="szymon.radomski@yahoo.com" class="email" />
            </div>
        </div>
        <DeferredContent>
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
                        :style="{ opacity: 0.05 + 0.012 * rowIndex }"
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
        </DeferredContent>
    </section>
</template>

<script setup lang="ts">
import hexagon from '/public/hexagon.svg'
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
