<template>
  <Card 
    v-bind="transformProps(props)"
    :class="$style['ad-card']"
  >
    <template #header>
      <slot name="header" />
    </template>

    <template #title>
      <slot name="title" />
    </template>

    <template #content>
      <slot name="content" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card } from 'primevue' // Import for Storybook

import type { CardInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<CardInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>