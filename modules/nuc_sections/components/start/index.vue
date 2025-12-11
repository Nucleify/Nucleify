<template>
  <div class="start-section container">
    <div class="start-animation">
      <slot />
    </div>
    <div class="start">
      <ad-heading :tag="1" :text="props.header" class="shiny start-header" />
      <ad-paragraph :text="props.description" class="start-description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NucSectionStartInterface } from 'atomic'

const props = defineProps<NucSectionStartInterface>()
</script>
