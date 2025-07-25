<template>
  <Divider
    :align="props.align"
    :layout="props.layout"
    :type="props.type"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { DividerInterface } from 'atomic'

import Divider from 'primevue/divider' // Import for Storybook

const props = defineProps<DividerInterface>()
</script>
