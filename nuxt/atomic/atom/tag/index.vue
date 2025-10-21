<template>
  <Tag
    :value="props.value"
    :severity="props.severity"
    :rounded="props.rounded"
    :icon="props.icon"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { Tag } from 'primevue' // Import for Storybook

import type { TagInterface } from 'atomic'

const props = defineProps<TagInterface>()
</script>
