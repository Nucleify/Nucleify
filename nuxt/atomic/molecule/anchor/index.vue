<template>
  <a
    :href="props.href"
    :rel="props.rel"
    :target="props.target"
    :style="props.style"
  >
    <slot />
    <ad-icon v-if="props.icon" :icon="props.icon" />
    <ad-image
      v-if="props.src"
      :src="props.src"
      :alt="props.alt"
      :fetchpriority="props.fetchpriority"
    />
    <ad-label
      v-if="props.label"
      :label="props.label"
      :style="{ cursor: 'pointer' }"
    />
  </a>
</template>

<script setup lang="ts">
import type { AnchorInterface } from 'atomic'

import { AdIcon, AdImage, AdLabel } from '../../atom' // Import for Storybook

const props = defineProps<AnchorInterface>()
</script>
