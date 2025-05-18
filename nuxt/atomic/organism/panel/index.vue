<template>
  <Panel
    :header="props.header"
    :toggleable="props.toggleable"
    :collapsed="props.collapsed"
    :toggle-button-props="props.toggleButtonProps"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <atom-paragraph :text="props.content" />
  </Panel>
</template>

<script setup lang="ts">
import { PanelInterface } from 'atomic'

const props = defineProps<PanelInterface>()
</script>
