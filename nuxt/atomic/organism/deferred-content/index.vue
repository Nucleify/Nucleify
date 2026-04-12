<template>
  <DeferredContent v-bind="transformProps(props)"> <slot /> </DeferredContent>
</template>

<script setup lang="ts">
import type { DeferredContentInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DeferredContentInterface>()
</script>
