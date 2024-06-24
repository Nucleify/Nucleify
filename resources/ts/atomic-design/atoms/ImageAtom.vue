<template>
    <Image
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :imageClass="imageClass"
        :preview="preview"
        :unstyled="unstyled"
        :zoomInDisabled="zoomInDisabled"
        :zoomOutDisabled="zoomOutDisabled"
    />
</template>

<script setup lang="ts">
import { ImageInterface } from 'atomic/bosons/types'

defineProps<ImageInterface>()
</script>
