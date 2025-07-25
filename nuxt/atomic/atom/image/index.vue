<template>
  <Image
    :preview="props.preview"
    :image-style="props.imageStyle"
    :image-class="props.imageClass"
    :preview-icon="props.previewIcon"
    :zoom-in-disabled="props.zoomInDisabled"
    :zoom-out-disabled="props.zoomOutDisabled"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :dt="props.dt"
    :unstyled="props.unstyled"
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :fetchpriority="props.fetchpriority || 'low'"
  />
</template>

<script setup lang="ts">
import type { ImageInterface } from 'atomic'

import Image from 'primevue/image' // Import for Storybook

const props = defineProps<ImageInterface>()
</script>
