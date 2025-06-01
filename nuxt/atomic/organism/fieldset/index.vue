<template>
  <Fieldset
    :legend="props.legend"
    :toggleable="props.toggleable"
    :toggle-button-props="props.toggleButtonProps"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { FieldsetInterface } from 'atomic'

const props = defineProps<FieldsetInterface>()
</script>
