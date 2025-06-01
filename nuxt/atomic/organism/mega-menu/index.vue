<template>
  <MegaMenu
    :model="props.model"
    :orientation="props.orientation"
    :breakpoint="props.breakpoint"
    :disabled="props.disabled"
    :tabindex="props.tabindex"
    :scroll-height="props.scrollHeight"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.pt"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { MegaMenuInterface } from 'atomic'

const props = defineProps<MegaMenuInterface>()
</script>
