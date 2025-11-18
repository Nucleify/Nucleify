<template>
  <MultiSelect v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { MultiSelectInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<MultiSelectInterface>()
</script>
