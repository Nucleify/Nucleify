<template>
    <Image
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :image-class="imageClass"
        :preview="preview"
        :unstyled="unstyled"
        :zoom-in-disabled="zoomInDisabled"
        :zoom-out-disabled="zoomOutDisabled"
    />
</template>

<script setup lang="ts">
import { ImageInterface } from 'atomic/bosons/types'

defineProps<ImageInterface>()
</script>
