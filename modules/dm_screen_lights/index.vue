<template>
  <div class="screen-lights-container">
    <span v-for="index in props.count" :key="index" class="screen-light"></span>
  </div>
</template>

<script setup lang="ts">
import type { ScreenLightsInterface } from '.'

const props = defineProps<ScreenLightsInterface>()
</script>
