<template>
  <p>
    {{ props.text }}
    <slot />
  </p>
</template>

<script setup lang="ts">
import Paragraph from 'primevue/paragraph' // Import for Storybook

import type { ParagraphInterface } from 'atomic'

const props = defineProps<ParagraphInterface>()
</script>
