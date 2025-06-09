<template>
  <ProgressBar
    :ad-type="props.adType"
    :value="props.value"
    :mode="props.mode"
    :show-value="props.showValue"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :style="{ width: props.width, height: props.height }"
  />
</template>

<script setup lang="ts">
import ProgressBar from 'primevue/progressbar' // Import for Storybook

import type { ProgressBarInterface } from 'atomic'

const props = defineProps<ProgressBarInterface>()
</script>
