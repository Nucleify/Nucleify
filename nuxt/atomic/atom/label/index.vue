<template>
  <label :for="props.forInput">
    {{ props.label }}
  </label>
</template>

<script setup lang="ts">
import type { LabelInterface } from 'atomic'

const props = defineProps<LabelInterface>()
</script>
