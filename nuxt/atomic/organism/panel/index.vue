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
    <ad-paragraph :text="props.content" />
  </Panel>
</template>

<script setup lang="ts">
import type { PanelInterface } from 'atomic'

const props = defineProps<PanelInterface>()
</script>
