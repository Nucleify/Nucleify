<template>
  <Divider
    :aling="props.align"
    :layout="props.layout"
    :type="props.type"
    :pt="props.pt"
    :ptOptions="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { DividerInterface } from 'atomic/bosons/types'

const props = defineProps<DividerInterface>()
</script>
