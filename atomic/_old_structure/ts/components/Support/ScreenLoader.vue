<template>
    <div class="loadContainer">
        <div class="loadContent">
            <image-atom src="logo.png" width="150px"/>
            <progress-bar-atom width="100px" height="10px" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    const loadContainer = document.querySelector('.loadContainer') as HTMLElement | null

    if (loadContainer) {
        setTimeout(() => {
            loadContainer.style.display = 'none'
        }, 850)
    }
})
</script>

