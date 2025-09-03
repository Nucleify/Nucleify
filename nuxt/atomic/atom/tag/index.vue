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
import type { TagInterface } from 'atomic'

import Tag from 'primevue/tag' // Import for Storybook

const props = defineProps<TagInterface>()
</script>
