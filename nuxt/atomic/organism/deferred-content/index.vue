<template>
  <DeferredContent
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.pt"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { DeferredContentInterface } from 'atomic'

const props = defineProps<DeferredContentInterface>()
</script>
