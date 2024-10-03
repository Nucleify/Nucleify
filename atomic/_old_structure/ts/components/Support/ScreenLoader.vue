<template>
    <div class="load-container">
        <div class="load-content">
            <ad-image src="logo.svg" width="150px" />
            <ad-progress-bar mode="indeterminate" width="100px" height="10px" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    const loadContainer = document.querySelector(
        '.load-container'
    ) as HTMLElement | null

    if (loadContainer) {
        setTimeout(() => {
            loadContainer.style.display = 'none'
        }, 850)
    }
})
</script>
