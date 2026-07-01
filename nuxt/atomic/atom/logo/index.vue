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
  if (!props.nuiType) {
    return undefined
  }

  const suffix = (colorSuffix.value === 'user' ? 'u' : 's') as 'u' | 's'
  const fallbackColor = defaultColors[`${props.nuiType}-c`] ?? '#10b981'
  const fallbackDarkColor = defaultColors[`${props.nuiType}-d`] ?? '#054a32'

  return {
    '--logo-lighter-color': `var(--${props.nuiType}-c-${suffix}, ${fallbackColor})`,
    '--logo-darker-color': `var(--${props.nuiType}-d-${suffix}, ${fallbackDarkColor})`,
  }
})
</script>
