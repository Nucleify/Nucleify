<template>
  <p>
    {{ $t(String(props.text ?? ''), String(props.text ?? '')) }}
    <slot />
  </p>
</template>

<script setup lang="ts">
import type { ParagraphInterface } from '.'

const props = defineProps<ParagraphInterface>()
</script>
