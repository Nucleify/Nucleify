<template>
  <Tooltip v-bind="transformProps(props, excludedProps)">
    <template #content>
      <slot />
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { Tooltip } from 'primevue' // Import for Storybook

import type { TooltipInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TooltipInterface>()

const excludedProps: string[] = []
</script>