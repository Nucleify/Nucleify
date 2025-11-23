<template>
  <Panel v-bind="transformProps(props, excludedProps)">
    <ad-paragraph :text="props.content" />
  </Panel>
</template>

<script setup lang="ts">
import type { PanelInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<PanelInterface>()

const excludedProps = ['content']
</script>
