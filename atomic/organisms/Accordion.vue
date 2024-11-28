<template>
  <Accordion
    :value="0"
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
      v-for="(panel, index) in panels"
      :value="panel.value"
      :key="index"
    >
      <AccordionHeader>{{ panel.header }}</AccordionHeader>
      <AccordionContent> {{ panel.content }}</AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup lang="ts">
import {
  AccordionInterface,
  AccordionPanelInterface,
} from 'atomic/bosons/types'

const props = defineProps<AccordionInterface>()
const panels: AccordionPanelInterface[] = [
  {
    value: 1,
    header: 'panel 1',
    content: 'Content for panel 1 ',
  },
  {
    value: 2,
    header: 'panel 2',
    content: 'Content for panel 2 ',
  },
  {
    value: 3,
    header: 'panel 3',
    content: 'Content for panel 3',
  },
]
</script>
