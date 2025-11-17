<template>
  <AutoComplete v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { AutoComplete } from 'primevue' // Import for Storybook

import type { AutoCompleteInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<AutoCompleteInterface>()
</script>
