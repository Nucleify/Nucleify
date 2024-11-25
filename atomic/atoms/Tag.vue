<template>
  <Tag
    :value="props.value"
    :severity="props.severity"
    :rounded="props.rounded"
    :pt="props.pt"
    :pr-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { TagInterface } from 'atomic/bosons/types'

const props = defineProps<TagInterface>()
</script>
