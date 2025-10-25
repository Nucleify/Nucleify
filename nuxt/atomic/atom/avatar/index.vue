<template>
  <Avatar v-bind="transformProps(props, excludedProps)" />
</template>

<script setup lang="ts">
import { Avatar } from 'primevue' // Import for Storybook

import type { AvatarInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<AvatarInterface>()

const excludedProps: string[] = []
</script>
