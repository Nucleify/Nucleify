<template>
  <AutoComplete v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { AutoComplete } from 'primevue' // Import for Storybook

import type { AutoCompleteInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<AutoCompleteInterface>()
</script>
