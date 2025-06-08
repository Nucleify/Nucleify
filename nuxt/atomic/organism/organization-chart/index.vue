<template>
  <OrganizationChart
    :value="props.value"
    :selection-keys="props.selectionKeys"
    :selection-mode="props.selectionMode"
    :collapsed-keys="props.collapsedKeys"
    :collapsible="props.collapsible"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { OrganizationChartInterface } from 'atomic'

const props = defineProps<OrganizationChartInterface>()
</script>
