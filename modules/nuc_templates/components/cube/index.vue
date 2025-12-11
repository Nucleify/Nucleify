<template>
  <div class="cube" :class="{ 'shiny': props.shiny }">
    <ad-icon :icon="props.icon || 'prime:box'" />
  </div>
</template>

<script setup lang="ts">
import type { NucCubeInterface } from '.'

const props = defineProps<NucCubeInterface>()
</script>
