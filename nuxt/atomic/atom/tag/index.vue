<template>
  <Tag v-bind="transformProps(props, excludedProps)" />
</template>

<script setup lang="ts">
import { Tag } from 'primevue' // Import for Storybook

import type { TagInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TagInterface>()

const excludedProps: string[] = []
</script>
