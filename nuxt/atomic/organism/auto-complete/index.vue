<template>
  <AutoComplete v-bind="transformProps(props)">
    <slot />
  </AutoComplete>
</template>

<script setup lang="ts">
import type { AutoCompleteInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<AutoCompleteInterface>()
</script>
