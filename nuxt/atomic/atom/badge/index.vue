<template>
  <Badge v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { Badge } from 'primevue' // Import for Storybook

import type { BadgeInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<BadgeInterface>()
</script>
