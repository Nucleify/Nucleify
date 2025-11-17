<template>
  <Tag v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { Tag } from 'primevue' // Import for Storybook

import type { TagInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TagInterface>()
</script>
