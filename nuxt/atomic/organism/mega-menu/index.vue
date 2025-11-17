<template>
  <MegaMenu v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { MegaMenuInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<MegaMenuInterface>()
</script>
