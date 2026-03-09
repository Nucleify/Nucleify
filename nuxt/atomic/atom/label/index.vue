<template>
  <label :for="props.forInput">
    {{ $t(String(props.label ?? ''), String(props.label ?? '')) }}
    <slot />
  </label>
</template>

<script setup lang="ts">
import type { LabelInterface } from '.'

const props = defineProps<LabelInterface>()
</script>
