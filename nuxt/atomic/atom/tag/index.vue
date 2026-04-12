<template>
  <Tag v-bind="transformProps(props)"> <slot /> </Tag>
</template>

<script setup lang="ts">
import type { TagInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TagInterface>()
</script>
