<template>
  <a
    :href="props.href"
    :rel="props.rel"
    :target="props.target"
    :style="props.style"
  >
    <slot />
    <ad-icon v-if="props.icon" :icon="props.icon" />
    <ad-image v-if="props.src" :src="props.src" />
    <ad-label
      v-if="props.label"
      :label="props.label"
      :style="{ cursor: 'pointer' }"
    />
  </a>
</template>

<script setup lang="ts">
import { AnchorInterface } from 'atomic/bosons/types'

const props = defineProps<AnchorInterface>()
</script>
