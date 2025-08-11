<template>
  <ProgressSpinner
    :ad-type="props.adType"
    :stroke-width="props.strokeWidth"
    :fill="props.fill"
    :animation-duration="props.animationDuration"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :style="{ width: props.width, height: props.height }"
  />
</template>

<script setup lang="ts">
import type { ProgressSpinnerInterface } from 'atomic'

import ProgressSpinner from 'primevue/progressspinner' // Import for Storybook

const props = defineProps<ProgressSpinnerInterface>()
</script>
