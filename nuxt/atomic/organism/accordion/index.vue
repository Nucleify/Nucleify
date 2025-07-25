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
import type { AccordionInterface } from 'atomic'

import Accordion from 'primevue/accordion' // Import for Storybook
import AccordionContent from 'primevue/accordioncontent' // Import for Storybook
import AccordionHeader from 'primevue/accordionheader' // Import for Storybook
import AccordionPanel from 'primevue/accordionpanel' // Import for Storybook

const props = defineProps<AccordionInterface>()
</script>
