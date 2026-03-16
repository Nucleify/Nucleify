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

import { defaultColors, getColorSuffix, useOfficeType } from 'nucleify'

import type { LogoInterface } from '.'

const props = defineProps<LogoInterface>()

const { officeType } = useOfficeType()

const colorSuffix = computed(() => getColorSuffix(officeType))

const logoStyle = computed(() => {
  if (!props.adType) {
    return undefined
  }

  const suffix = (colorSuffix.value === 'user' ? 'u' : 's') as 'u' | 's'
  const fallbackColor = defaultColors[`${props.adType}-c`] ?? '#10b981'
  const fallbackDarkColor = defaultColors[`${props.adType}-d`] ?? '#054a32'

  return {
    '--logo-lighter-color': `var(--${props.adType}-c-${suffix}, ${fallbackColor})`,
    '--logo-darker-color': `var(--${props.adType}-d-${suffix}, ${fallbackDarkColor})`,
  }
})
</script>
