<template>
  <Badge
    :value="props.value"
    :severity="props.severity"
    :size="props.size"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { BadgeInterface } from 'atomic'

import Badge from 'primevue/badge' // Import for Storybook

const props = defineProps<BadgeInterface>()
</script>
