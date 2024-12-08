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
import { FieldsetInterface } from 'atomic/bosons/types'

const props = defineProps<FieldsetInterface>()
</script>
