<template>
  <OrganizationChart v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { OrganizationChartInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<OrganizationChartInterface>()
</script>
