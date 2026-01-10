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

import { getColorSuffix, useOfficeType } from 'atomic'

import type { LogoInterface } from '.'

const props = defineProps<LogoInterface>()

const { officeType } = useOfficeType()

const colorSuffix = computed(() => getColorSuffix(officeType))

const logoStyle = computed(() => {
  if (!props.adType) {
    return undefined
  }

  const suffix = colorSuffix.value || 'system'

  return {
    '--logo-lighter-color': `var(--${props.adType}-item-color-${suffix})`,
    '--logo-darker-color': `var(--${props.adType}-item-dark-color-${suffix})`,
  }
})
</script>
