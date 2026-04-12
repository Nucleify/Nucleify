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
        <nuc-animation-hexagons
          v-if="props.hexagons"
          :class="$style['ad-hexagon-rows-container']"
        />
        {{ panel.content }}
      </AccordionHeader>
      <AccordionContent :class="$style['ad-accordion-content']">
        {{ panel.answer }}
      </AccordionContent>
    </AccordionPanel>
    <slot />
  </Accordion>
</template>

<script setup lang="ts">
import type { AccordionInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<AccordionInterface>()

const excludedProps = ['panels', 'hexagons']
</script>

<style lang="scss" module>
@import 'index';
</style>
