<template>
  <Badge
    :value="props.value"
    :severity="props.severity"
    :size="props.size"
    :pr="props.pt"
    :ptOptions="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { BadgeInterface } from 'atomic/bosons/types'

const props = defineProps<BadgeInterface>()
</script>
