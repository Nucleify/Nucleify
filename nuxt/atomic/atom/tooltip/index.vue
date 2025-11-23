<template>
  <Tooltip v-bind="transformProps(props)">
    <template #content>
      <slot />
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { Tooltip } from 'primevue' // Import for Storybook

import type { TooltipInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TooltipInterface>()
</script>