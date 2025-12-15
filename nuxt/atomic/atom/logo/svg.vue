<template>
  <svg
    :height="props.dimensions || 44"
    :width="props.dimensions || 44"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2710 3140"
    version="1.1"
  >
    <AdLogoPaths 
      :lighter-color-class="props.lighterColorClass" 
      :darker-color-class="props.darkerColorClass"
    />
  </svg>
</template>

<script setup lang="ts">
import type { LogoInterface } from '.'
import { AdLogoPaths } from '.'

const props = defineProps<LogoInterface>()
</script>
