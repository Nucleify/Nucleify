<template>
  <svg 
    :width="props.dimensions || 44"
    :height="props.dimensions || 44"
    :style="props.adType ? {
      '--logo-lighter-color': `var(--${props.adType}-item-color-new)`,
      '--logo-darker-color': `var(--${props.adType}-item-dark-color-new)`
    } : undefined"
  >
    <use href="#logo-symbol" />
  </svg>
</template>

<script setup lang="ts">
import type { LogoInterface } from '.'

const props = defineProps<LogoInterface>()
</script>
