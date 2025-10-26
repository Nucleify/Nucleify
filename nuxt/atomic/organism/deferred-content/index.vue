<template>
  <DeferredContent v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { DeferredContentInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DeferredContentInterface>()
</script>
