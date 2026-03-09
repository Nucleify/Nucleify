<template>
  <MegaMenu v-bind="transformProps(props)">
    <slot />
  </MegaMenu>
</template>

<script setup lang="ts">
import type { MegaMenuInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<MegaMenuInterface>()
</script>
