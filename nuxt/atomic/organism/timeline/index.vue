<template>
  <Timeline
    :value="props.value"
    :align="props.align"
    :layout="props.layout"
    :data-key="props.dataKey"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <template #event="event">
      <div :style="{ color: event.color }">
        <ad-icon :icon="event.icon" />
        <strong>{{ event.status }}</strong> - {{ event.date }}
      </div>
    </template>
  </Timeline>
</template>

<script setup lang="ts">
import type { TimelineInterface } from 'atomic'

const props = defineProps<TimelineInterface>()
</script>
