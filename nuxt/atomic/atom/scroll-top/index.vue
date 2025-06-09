<template>
  <ScrollTop
    :target="props.target"
    :threshold="props.threshold"
    :icon="props.icon"
    :behavior="props.behavior"
    :button-props="props.buttonProps"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import type { ScrollTopInterface } from 'atomic'

const props = defineProps<ScrollTopInterface>()
</script>
