<template>
  <Accordion v-bind="transformProps(props, excludedProps)">
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

import { transformProps } from '../../boson/transform_props'

const props = defineProps<AccordionInterface>()

const excludedProps = ['panels', 'hexagons']
</script>
