<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2710 3140"
    :width="props.dimensions || 44"
    :height="props.dimensions || 44"
  >
    <symbol id="logo-symbol" viewBox="0 0 2710 3140">
      <AdLogoPaths
        :lighter-color-class="[$style['lighter-color'], props.lighterColorClass]"
        :darker-color-class="[$style['darker-color'], props.darkerColorClass]"
      />
    </symbol>
  </svg>
</template>

<script setup lang="ts">
import type { LogoInterface } from '.'

const props = defineProps<LogoInterface>()
</script>

<style lang="scss" module>
@import '.';
</style>
