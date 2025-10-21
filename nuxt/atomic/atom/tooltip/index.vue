<template>
  <Tooltip
    :value="props.value"
    :disabled="props.disabled"
    :id="props.id"
    :class="props.class"
    :escape="props.escape"
    :fitContent="props.fitContent"
    :showDelay="props.showDelay"
    :hideDelay="props.hideDelay"
    :autoHide="props.autoHide"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <template #content>
      <slot />
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { Tooltip } from 'primevue' // Import for Storybook

import type { TooltipInterface } from 'atomic'

const props = defineProps<TooltipInterface>()
</script>