<template>
  <Accordion
    :value="props.value"
    :multiple="props.multiple"
    :lazy="props.lazy"
    :expand-icon="props.expandIcon"
    :collapse-icon="props.collapseIcon"
    :tabindex="props.tabindex"
    :select-on-focus="props.selectOnFocus"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <AccordionPanel
      v-for="(panel, index) in props.panels"
      :key="index"
      :value="panel.index"
    >
      <AccordionHeader>
        <dm-animation-hexagons v-if="props.hexagons" />
        {{ panel.content }}
      </AccordionHeader>
      <AccordionContent>{{ panel.answer }}</AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from 'primevue' // Import for Storybook

import type { AccordionInterface } from 'atomic'

const props = defineProps<AccordionInterface>()
</script>
