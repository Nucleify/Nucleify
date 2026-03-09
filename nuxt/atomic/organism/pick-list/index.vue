<template>
  <PickList v-bind="transformProps(props)">
    <slot />
  </PickList>
</template>

<script setup lang="ts">
import type { PickListInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<PickListInterface>()
</script>
