<template>
  <Divider
    :align="props.align"
    :layout="props.layout"
    :type="props.type"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { DividerInterface } from 'atomic/bosons/types'

const props = defineProps<DividerInterface>()
</script>
