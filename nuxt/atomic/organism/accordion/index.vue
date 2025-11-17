<template>
  <Accordion 
    v-bind="transformProps(props, excludedProps)"
    :class="$style['ad-accordion']"
  >
    <AccordionPanel
      v-for="(panel, index) in props.panels"
      :key="index"
      :value="panel.index"
      :class="$style['ad-accordionpanel']"
    >
      <AccordionHeader
        :class="$style['ad-accordionheader']"
        :pt="{
          toggleIcon: $style['ad-accordionheader-toggle-icon'],
        }"
      >
        <dm-animation-hexagons 
          v-if="props.hexagons" 
          :class="$style['ad-hexagon-rows-container']"
        />
        {{ panel.content }}
      </AccordionHeader>
      <AccordionContent 
        :class="$style['ad-accordion-content']"
      >
        {{ panel.answer }}
      </AccordionContent>
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

<style lang="scss" module>
@import 'index';
</style>