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
      :value="panel.index"
      :key="index"
    >
      <AccordionHeader>
        <dm-animation-hexagons />
        {{ panel.content }}
      </AccordionHeader>
      <AccordionContent>{{ panel.answer }}</AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup lang="ts">
import Accordion from 'primevue/accordion' // Import for Storybook
import AccordionPanel from 'primevue/accordionpanel' // Import for Storybook
import AccordionContent from 'primevue/accordioncontent' // Import for Storybook
import AccordionHeader from 'primevue/accordionheader' // Import for Storybook

import { AccordionInterface } from 'atomic'

const props = defineProps<AccordionInterface>()
</script>
