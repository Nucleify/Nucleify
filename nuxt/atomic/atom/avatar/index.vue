<template>
  <Avatar v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { Avatar } from 'primevue' // Import for Storybook

import type { AvatarInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<AvatarInterface>()
</script>
