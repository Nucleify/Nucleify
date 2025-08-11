<template>
  <Skeleton
    v-if="props.loading"
    :shape="props.shape"
    :size="props.size"
    :width="props.width"
    :height="props.height"
    :border-radius="props.borderRadius"
    :animation="props.animation"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { SkeletonInterface } from 'atomic'

import Skeleton from 'primevue/skeleton' // Import for Storybook

const props = defineProps<SkeletonInterface>()
</script>
