<template>
  <svg 
    :width="props.dimensions || 44"
    :height="props.dimensions || 44"
    :style="logoStyle"
  >
    <use href="#logo-symbol" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { LogoInterface } from '.'

import { defaultColors, getColorSuffix, useOfficeType } from 'nucleify'

const props = defineProps<LogoInterface>()

const { officeType } = useOfficeType()

const colorSuffix = computed(() => getColorSuffix(officeType))

const logoStyle = computed(() => {
  if (!props.adType) {
    return undefined
  }

  const suffix = colorSuffix.value || 'system'
  const fallbackColor = defaultColors[`${props.adType}-item-color`] ?? '#10b981'
  const fallbackDarkColor =
    defaultColors[`${props.adType}-item-dark-color`] ?? '#054a32'

  return {
    '--logo-lighter-color': `var(--${props.adType}-item-color-${suffix}, ${fallbackColor})`,
    '--logo-darker-color': `var(--${props.adType}-item-dark-color-${suffix}, ${fallbackDarkColor})`,
  }
})
</script>
