<template>
  <ScrollTop
    :target="props.target"
    :threshold="props.threshold"
    :behavior="props.behavior"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { ScrollTopInterface } from 'atomic/bosons/types'

const props = defineProps<ScrollTopInterface>()
</script>
