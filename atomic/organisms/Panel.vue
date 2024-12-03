<template>
  <Panel
    v-for="(panel, index) in props.panels"
    :key="index"
    :header="props.header || panel.header"
    :toggleable="props.toggleable ?? panel.toggleable"
    :collapsed="props.collapsed ?? panel.collapsed"
    :toggle-button-props="props.toggleButtonProps || panel.toggleButtonProps"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <Paragraph v-if="panel.content">
      {{ panel.content }}
    </Paragraph>
    <slot :panel="panel" />
  </Panel>
</template>

<script setup lang="ts">
import { PanelInterface } from 'atomic/bosons/types'
import { Paragraph } from 'atomic/atoms'

const props = defineProps<PanelInterface>()
</script>
