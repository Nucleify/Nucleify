<template>
  <label :for="props.forInput">
    {{ props.label }}
  </label>
</template>

<script setup lang="ts">
import type { LabelInterface } from '.'

const props = defineProps<LabelInterface>()
</script>
