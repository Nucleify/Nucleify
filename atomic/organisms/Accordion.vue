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
      v-for="(panel, index) in props.panels"
      :value="panel.value"
      :key="index"
    >
      <AccordionHeader>{{ panel.header }}</AccordionHeader>
      <AccordionContent>{{ panel.content }}</AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup lang="ts">
import { AccordionInterface } from 'atomic/bosons/types'

const props = defineProps<AccordionInterface>()
</script>
