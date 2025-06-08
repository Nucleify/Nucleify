<template>
  <ScrollPanel
    :step="props.step"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { ScrollPanelInterface } from 'atomic'

const props = defineProps<ScrollPanelInterface>()
</script>
