<template>
  <Editor v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { EditorInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<EditorInterface>()
</script>
