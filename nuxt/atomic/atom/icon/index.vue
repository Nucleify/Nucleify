<template>
  <Icon v-if="props.icon" 
    v-bind="transformProps(props, excludedProps, propMap)"
   />
</template>

<script setup lang="ts">
import type { IconInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<IconInterface>()

const excludedProps: string[] = []

const propMap = {
  icon: 'name',
}
</script>
