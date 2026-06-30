<template>
  <div
    class="ad-spacing"
    :class="[props.class, sizeClass]"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { SpacingInterface } from './types'

const props = withDefaults(defineProps<SpacingInterface>(), {
  size: 'normal',
})

const sizeClass = computed(() =>
  props.size === 'normal' ? undefined : `ad-spacing-${props.size}`
)
</script>

<style lang="scss">
@import 'index';
</style>
