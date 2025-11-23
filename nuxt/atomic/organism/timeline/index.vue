<template>
  <Timeline v-bind="transformProps(props)">
    <template #event="event">
      <div :style="{ color: event.color }">
        <ad-icon :icon="event.icon" />
        <strong>{{ event.status }}</strong> - {{ event.date }}
      </div>
    </template>
  </Timeline>
</template>

<script setup lang="ts">
import type { TimelineInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<TimelineInterface>()
</script>
