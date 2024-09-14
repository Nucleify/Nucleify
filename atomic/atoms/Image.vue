<template>
    <Image
        :preview="props.preview"
        :image-class="props.imageClass"
        :zoom-in-disabled="props.zoomInDisabled"
        :zoom-out-disabled="props.zoomOutDisabled"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :unstyled="props.unstyled"
        :src="props.src"
        :alt="props.alt"
        :width="props.width"
        :height="props.height"
    />
</template>

<script setup lang="ts">
import { ImageInterface } from 'atomic/bosons/types'

const props = defineProps<ImageInterface>()
</script>
