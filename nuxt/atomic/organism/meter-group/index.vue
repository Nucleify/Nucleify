<template>
  <MeterGroup
    :value="props.value"
    :min="props.min"
    :max="props.max"
    :orientation="props.orientation"
    :label-position="props.labelPosition"
    :label-orientation="props.labelOrientation"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { MeterGroupInterface } from 'atomic'

const props = defineProps<MeterGroupInterface>()
</script>
