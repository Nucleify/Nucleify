<template>
  <p>
    {{ props.text }}
    <slot />
  </p>
</template>

<script setup lang="ts">
import { ParagraphInterface } from 'atomic'

const props = defineProps<ParagraphInterface>()
</script>
